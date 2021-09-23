# Codic Education Server

This is the code for Codic Educations server

## Programs required
MongDB - https://www.mongodb.com/try/download/community?tck=docs_server

Insomnia - https://insomnia.rest/download


## Setting Up

Insomnia: 

1. Open insomnia

2. Go to settings -> Data -> Choose Import Data from file

3. Go to the application folder -> configurations -> Insomnia 

4. Double click on the newest JSON file


MongoDB Compass:

1. Go to project directory

2. Create new file -> name it '.env'

3. insert the following code:

    DEV_DATABASE_URL = mongodb://localhost/codic
    PROD_DATABASE_URL = TBD
    PORT = 3001
    ENVIROMENT = DEVELOPMENT

4. Save

5. Open MongoDB Compass

6. Under New Connection -> click on the 'Connect' button

7. Now you should be able to see the Codic database in your menu

## Install

1. In the project directory you can run:

```
npm install
```

## Usage

1. In the project directory you can run:

```
npm start
```
Runs the app in the development mode.

## Contributing

PRs accepted from contributors.

Do not push to master! Always create a new branch that you can commit and push to.
After pushing your commits to your branch, you can create a PR.