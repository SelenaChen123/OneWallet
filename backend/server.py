import json
# import psycopg2 as pg
import sqlite3
from six.moves.urllib.request import urlopen
from functools import wraps

from flask import Flask, request, jsonify, _request_ctx_stack, g, request
from flask_cors import cross_origin
from jose import jwt

AUTH0_DOMAIN = 'dev-8s4z77rcverlv0at.us.auth0.com'
API_AUDIENCE = 'https://hacknc2022ast-api'
ALGORITHMS = ["RS256"]

app = Flask(__name__)

# Error handler
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

# Format error response and append status code
def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with"
                            " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be"
                            " Bearer token"}, 401)

    token = parts[1]
    return token

def requires_auth(f):
    """Determines if the Access Token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    "please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
    return decorated

def get_user_id():
    token = get_token_auth_header()
    claims = jwt.get_unverified_claims(token)
    # return claims['sub']
    return '1'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect("database.db")
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.commit()
        db.close()

@app.route('/api/info')
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def get_info():
    cur = get_db().cursor()
    user_id = get_user_id()
    res = cur.execute('SELECT name FROM users WHERE user_id = ?', (user_id,))
    name = res.fetchone()

    res = cur.execute('SELECT account_number, bank_name, account_type, balance FROM bank_accounts WHERE user_id = ?', (user_id,))
    # account_data = [{ 'accountNumber': an, 'bankName': bn, 'accountType': at, 'balance': b } for an, bn, at, b in res.fetchall()]
    account_data = []
    for an, bn, at, b in res.fetchall():
        account = { 'accountNumber': an, 'accountType': at, 'balance': b }
        existing = next((x for x in account_data if x['bankName'] == bn), None)
        if existing is None:
            account_data.append({ 'bankName': bn, 'accounts': [account] })
        else:
            existing['accounts'].append(account)

    res = cur.execute('SELECT amount_due, due_date, description, paid FROM bills WHERE user_id = ?', (user_id,))
    # bill_data = [{ 'amountDue': ad, 'dueDate': dd, 'description': d, 'isPaid': p } for ad, dd, d, p in res.fetchall()]
    bill_data = []
    for ad, dd, d, p in res.fetchall():
        bill = { 'amountDue': ad, 'description': d, 'isPaid': p }
        existing = next((x for x in bill_data if x['dueDate'] == dd), None)
        if existing is None:
            bill_data.append({ 'dueDate': dd, 'bills': [bill] })
        else:
            existing['bills'].append(bill)

    res = cur.execute('SELECT T.account_number, T.bank_name, T.amount, T.date, T.description, T.withdrawal FROM transactions AS T, bank_accounts as B WHERE B.user_id = ? AND B.account_number = T.account_number AND B.bank_name = T.bank_name', (user_id,))
    # transaction_data = [{ 'accountNumber': an, 'bankName': bn, 'amount': a, 'date': da, 'description': de, 'isWithdrawal': w } for an, bn, a, da, de, w in res.fetchall()]
    transaction_data = []
    for an, bn, a, da, de, w in res.fetchall():
        transaction = { 'accountNumber': an, 'bankName': bn, 'amount': a, 'description': de, 'isWithdrawal': w }
        existing = next((x for x in transaction_data if x['date'] == da), None)
        if existing is None:
            transaction_data.append({ 'date': da, 'transactions': [transaction] })
        else:
            existing['transactions'].append(transaction)

    res = cur.execute('SELECT report_date, credit_score, reporting_agency FROM credit_scores WHERE user_id = ?', (user_id,))
    credit_score_data = [{ 'reportDate': rd, 'creditScore': cs, 'reportingAgency': ra } for rd, cs, ra in res.fetchall()]

    res = cur.execute('SELECT bank_name, name, phone, email FROM financial_advisors WHERE user_id = ?', (user_id,))
    financial_advisors_data = []
    for bn, n, p, e in res.fetchall():
        financial_advisor = { 'name': n, 'phone': p, 'email': e }
        financial_advisors_data.append({ 'bankName': bn, 'advisor': financial_advisor })
        
    res = cur.execute('SELECT amount_due, due_date, description FROM bills WHERE user_id = ?', (user_id,))
    scheduled_payments_data = []
    for ad, dd, d in res.fetchall():
        payment = { 'amountDue': ad, 'description': d }
        existing = next((x for x in scheduled_payments_data if x['dueDate'] == dd), None)
        if existing is None:
            scheduled_payments_data.append({ 'dueDate': dd, 'bills': [payment] })
        else:
            existing['payments'].append(payment)

    cur.close()
    return jsonify({ 'name': name, 'accountData': account_data, 'billData': bill_data, 'transactionData': transaction_data, 'creditScoreData': credit_score_data, 'financialAdvisorData': financial_advisors_data })

@app.route('/api/add-bill', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def add_bill():
    user_id = get_user_id()
    description = request.json['description']
    amount_due = request.json['amountDue']
    due_date = request.json['dueDate']
    cur = get_db().cursor()
    cur.execute('INSERT INTO bills (user_id, amount_due, due_date, description, paid) VALUES (?, ?, ?, ?, FALSE)', (user_id, amount_due, due_date, description))
    cur.close()
    return jsonify({ 'success': True })

@app.route('/api/remove-bill', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def remove_bill():
    user_id = get_user_id()
    description = request.json['description']
    cur = get_db().cursor()
    cur.execute('DELETE FROM bills WHERE user_id = ? AND description = ?', (user_id, description))
    cur.close()
    return jsonify({ 'success': True })

@app.route('/api/check-bill', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def check_bill():
    user_id = get_user_id()
    description = request.json['description']
    cur = get_db().cursor()
    cur.execute('UPDATE bills SET paid = (paid + 1) % 2 WHERE user_id = ? AND description = ?', (user_id, description))
    cur.close()
    return jsonify({ 'success': True })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
