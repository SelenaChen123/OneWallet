
import sqlite3

con = sqlite3.connect("database.db")
con.executescript('''
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT,
    name TEXT,

    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS bank_accounts (
    account_number TEXT,
    user_id TEXT,
    bank_name TEXT,
    account_type TEXT,
    balance INTEGER,

    PRIMARY KEY (account_number, bank_name),
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE IF NOT EXISTS bills (
    user_id TEXT,
    amount_due INTEGER,
    due_date TEXT,
    description TEXT,
    paid INTEGER,

    PRIMARY KEY (user_id, description),
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE IF NOT EXISTS transactions (
    account_number TEXT,
    bank_name TEXT,
    amount INTEGER,
    date TEXT,
    description TEXT,
    withdrawal INTEGER,

    PRIMARY KEY (account_number, bank_name, date),
    FOREIGN KEY (account_number, bank_name) REFERENCES bank_accounts
);

CREATE TABLE IF NOT EXISTS credit_scores (
    user_id TEXT,
    report_date TEXT,
    credit_score INTEGER,
    reporting_agency TEXT,

    PRIMARY KEY (user_id, report_date, reporting_agency)
);
''')

con.executemany('INSERT INTO users (user_id, name) VALUES (?, ?)', [
    ('1', 'Bob'),
    ('2', 'Joe'),
    ('3', 'Bill'),
])

con.executemany("INSERT INTO bank_accounts (account_number, user_id, bank_name, account_type, balance) VALUES (?, ?, ?, ?, ?)", [
    ('12345', '1', 'Bank of Murica', "Savings Account", 100000),
    ('12346', '1', 'Chased', "Checking Account", 12300),
    ('12347', '2', 'Bank of Murica', "Savings Account", 100000),
    ('12348', '3', '"Definitely Not Money Laundering" Bank (tm)', "Checking Account", 10000000),
])

con.executemany('INSERT INTO bills (user_id, amount_due, due_date, description, paid) VALUES (?, ?, ?, ?, FALSE)', [
    ('1', 12300, '2000-01-01', 'Mansion 1 Mortgage'),
    ('1', 12400, '2000-01-01', 'Mansion 2 Mortgage'),
    ('1', 12500, '2000-01-01', 'Mansion 3 Mortgage'),
    ('1', 12400, '2001-01-01', 'Mansion 4 Mortgage'),
    ('2', 100, '2003-01-01', '2012 Nissan Altima'),
    ('2', 50, '2004-01-01', 'Lamborghini Aventador'),
    ('3', 100000, '2005-01-01', 'Electricity'),
])

con.executemany('INSERT INTO transactions (account_number, bank_name, amount, date, description, withdrawal) VALUES (?, ?, ?, ?, ?, ?)', [
    ('12345', 'Bank of Murica', 12300, '2000-01-01 12:30:00.000', 'Money Laundering', 1),
    ('12345', 'Bank of Murica', 120000, '2000-01-02 12:30:00.000', 'Money Laundering', 1),
    ('12345', 'Bank of Murica', 10000, '2000-01-03 12:30:00.000', 'Money Laundering', 1),
    ('12345', 'Bank of Murica', 10000, '2000-01-04 12:30:00.000', 'Money Laundering', 1),
    ('12345', 'Bank of Murica', 10000, '2000-01-05 12:30:00.000', 'Money Laundering', 1),
])

con.executemany('INSERT INTO credit_scores (user_id, report_date, credit_score) VALUES (?, ?, ?)', [
    ('1', '2000-01-01 12:30:00.000', 100),
    ('1', '2001-01-01 12:30:00.000', 200),
    ('1', '2002-01-01 12:30:00.000', 800),
])
con.commit()
con.close()