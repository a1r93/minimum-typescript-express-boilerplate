# minimum-typescript-express-boilerplate

Really minimalistic boilerplate with typescript setup for express server

## To launch

```
npm install

OR

yarn
```

Then add a file named .env and add the following keys:

- PORT: the port number your server should run on
- LOGS_PATH= the path to the log files generated with winston

your .env file should therefore look like follow:

```
PORT=8000
LOGS_PATH=/Users/myUser/projectName/logs
```

Then run the following command:

```
npm start

OR

yarn start
```

then try to connect to http://localhost:8000, it should print Hello World!

To add routes go to the `src/app.ts` file
