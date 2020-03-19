#Netatmo Weather Widget

To install the project, please make sure you have Node, then use the console and type :

```bash
    npm install
```

To start the project, run :
```bash
    npm start
```
or, on dev mode (make sure you installed the devDependencies as well) :
```bash
    npm run dev
```

The server will be listening on port 8080, so make sure this port is available. You can access the server site via your web browser at the following address: `localhost:8080`

If you get the `Data could not be loaded` error, go to the `api/netatmo.ts` file and enter your own access token, then reload the server.