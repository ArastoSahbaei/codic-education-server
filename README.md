# Codic Education Server

This is the code for Codic Educations server

## Programs required
MongDB - https://www.mongodb.com/try/download/community?tck=docs_server

Node JS - https://nodejs.org/en/download/

## Recommened programs
Insomnia - https://insomnia.rest/download

## Setting Up

MongoDB Compass:

1. Go to project directory

2. Create new file -> name it '.env'

3. insert the following code:

    DEV_DATABASE_URL = mongodb://localhost/codic
    PROD_DATABASE_URL = TBD
    PORT = 3001
    ENVIROMENT = DEVELOPMENT

    EMAIL = x
    CLIENT_ID = x
    CLIENT_SECRET = x
    REFRESH_TOKEN = x
    PAYPAL_CLIENT_ID = x
    PAYPAL_CLIENT_SECRET = x 

4. Save

5. Open MongoDB Compass

6. Under New Connection -> click on 'Connect'

7. Now you should be able to see the database in your menu

## Install

1. In the project directory you can run:

```
npm install
```

## Usage

1. In the project directory you can run:

```
nodemon Server.js
```

or

```
npx nodemon Server.js
```
Runs the app in the development mode.

## Contributing

PRs accepted from contributors.

You cannot push to master. The master branch is locked during development so you will need to create a new branch that you can commit and push to.
After pushing your commits to your branch, you can create a PR.
