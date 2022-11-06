# ☝️👛 One Wallet



## How to Run 👷🏻

### Backend

Ensure you have `python` version `3.6` or greater installed on your system. For our application, our current `python` version is `3.10`.  

```python
# Ensure you have python 3
$ python --version
Python 3.10.1

# Navigate to backend directory
$ cd backend

# Install necessary python packages
$ pip install -r requirements.txt

# Initialize the schema and populate database
python init_db.py

# Run flask application
> $env:FLASK_APP='server'; $env:FLASK_ENV='development'; python -m flask run
# or 
$ export FLASK_APP=server FLASK_ENV=development python -m flask run
 * Serving Flask app "app" (lazy loading)
 * Environment: development
 * Debug mode: on
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 131-992-963
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

### Frontend

Ensure you have `npm` version `8.3` or greater installed on your system. For our application, our current `npm` version is `8.3`.  

```bash
# Ensure you have npm
$ npm -v
8.3.0

# Navigate to frontend directory
$ cd frontend

# Install necessary npm packages
$ npm i

# Run the frontend application
$ npm run start
Starting the development server...
<...output omitted...>
webpack compiled with 1 warning
No issues found.
```
