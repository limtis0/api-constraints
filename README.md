# About
This is a simple REST API which focuses on the prevention of race condition on changing the balance of a user.
For a test, a 10000 requests are sent at the same time and 5000 of them must pass, while the other 5000 must fail.

To achieve this kind of behaviour, I used database constraints.

# How to run
You must fill in .ENV file with the credentials for PostgreSQL database running based on the example below

After that, you can run the application via:

```
npm install
npm run start
```

To run a test with 10k requests, run:

```
npm run test
```

## .ENV example

```
DB_HOST=localhost
DB_PORT=5433
DB_NAME=decision
DB_USER=postgres
DB_PASS=pgPassword00
API_PORT=3000
```