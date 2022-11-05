import json
# import psycopg2 as pg
import sqlite3
from six.moves.urllib.request import urlopen
from functools import wraps

from flask import Flask, request, jsonify, _request_ctx_stack, g, request
from flask_cors import cross_origin
from jose import jwt

AUTH0_DOMAIN = 'dev-8s4z77rcverlv0at.us.auth0.com'
API_AUDIENCE = 'https://localhost:5000/api/'
ALGORITHMS = ["RS256"]

app = Flask(__name__)

# # Error handler
# class AuthError(Exception):
#     def __init__(self, error, status_code):
#         self.error = error
#         self.status_code = status_code

# @app.errorhandler(AuthError)
# def handle_auth_error(ex):
#     response = jsonify(ex.error)
#     response.status_code = ex.status_code
#     return response

# # Format error response and append status code
# def get_token_auth_header():
#     """Obtains the Access Token from the Authorization Header
#     """
#     auth = request.headers.get("Authorization", None)
#     if not auth:
#         raise AuthError({"code": "authorization_header_missing",
#                         "description":
#                             "Authorization header is expected"}, 401)

#     parts = auth.split()

#     if parts[0].lower() != "bearer":
#         raise AuthError({"code": "invalid_header",
#                         "description":
#                             "Authorization header must start with"
#                             " Bearer"}, 401)
#     elif len(parts) == 1:
#         raise AuthError({"code": "invalid_header",
#                         "description": "Token not found"}, 401)
#     elif len(parts) > 2:
#         raise AuthError({"code": "invalid_header",
#                         "description":
#                             "Authorization header must be"
#                             " Bearer token"}, 401)

#     token = parts[1]
#     return token

# def requires_auth(f):
#     """Determines if the Access Token is valid
#     """
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = get_token_auth_header()
#         jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
#         jwks = json.loads(jsonurl.read())
#         unverified_header = jwt.get_unverified_header(token)
#         rsa_key = {}
#         for key in jwks["keys"]:
#             if key["kid"] == unverified_header["kid"]:
#                 rsa_key = {
#                     "kty": key["kty"],
#                     "kid": key["kid"],
#                     "use": key["use"],
#                     "n": key["n"],
#                     "e": key["e"]
#                 }
#         if rsa_key:
#             try:
#                 payload = jwt.decode(
#                     token,
#                     rsa_key,
#                     algorithms=ALGORITHMS,
#                     audience=API_AUDIENCE,
#                     issuer="https://"+AUTH0_DOMAIN+"/"
#                 )
#             except jwt.ExpiredSignatureError:
#                 raise AuthError({"code": "token_expired",
#                                 "description": "token is expired"}, 401)
#             except jwt.JWTClaimsError:
#                 raise AuthError({"code": "invalid_claims",
#                                 "description":
#                                     "incorrect claims,"
#                                     "please check the audience and issuer"}, 401)
#             except Exception:
#                 raise AuthError({"code": "invalid_header",
#                                 "description":
#                                     "Unable to parse authentication"
#                                     " token."}, 401)

#             _request_ctx_stack.top.current_user = payload
#             return f(*args, **kwargs)
#         raise AuthError({"code": "invalid_header",
#                         "description": "Unable to find appropriate key"}, 401)
#     return decorated

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect("database.db")
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/api/info/<user_id>')
# @requires_auth
def get_info(user_id):
    cur = get_db().cursor()
    res = cur.execute('SELECT * FROM users')
    print(res.fetchall())
    res = cur.execute('SELECT name FROM users WHERE user_id = ?', (user_id,))
    name = res.fetchone()
    res = cur.execute('SELECT account_number, bank_name, balance FROM bank_accounts WHERE user_id = ?', (user_id,))
    account_data = res.fetchall()
    res = cur.execute('SELECT amount_due, due_date, description FROM bills WHERE user_id = ?', (user_id,))
    bill_data = res.fetchall()
    res = cur.execute('SELECT T.account_number, T.bank_name, T.amount, T.date, T.description, T.withdrawal FROM transactions AS T, bank_accounts as B WHERE B.user_id = ? AND B.account_number = T.account_number AND B.bank_name = T.bank_name', (user_id,))
    transaction_data = res.fetchall()
    cur.close()
    return jsonify({ 'name': name, 'account_data': account_data, 'bill_data': bill_data, 'transaction_data': transaction_data })

@app.route('/api/add-bill/<user_id>', methods=['POST'])
def add_bill(user_id):
    description = request.json['description']
    user_id = request.json['user_id']
    amount_due = request.json['amount_due']
    due_date = request.json['due_date']
    cur = get_db().cursor()
    cur.execute('INSERT INTO bills (user_id, amount_due, due_date, description, paid) VALUES (?, ?, ?, ?, FALSE)', (user_id, amount_due, due_date, description))
    cur.close()

@app.route('/api/remove-bill/<user_id>', methods=['POST'])
def remove_bill(user_id):
    description = request.json['description']
    user_id = request.json['user_id']
    cur = get_db().cursor()
    cur.execute('DELETE FROM bills WHERE user_id = ? AND description = ?', (user_id, description))
    cur.close()

@app.route('/api/check-bill/<user_id>', methods=['POST'])
def check_bill(user_id):
    description = request.json['description']
    user_id = request.json['user_id']
    cur = get_db().cursor()
    cur.execute('UPDATE bills SET paid = (paid + 1) % 2 WHERE user_id = ? AND description = ?', (user_id, description))
    cur.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
