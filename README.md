#Netatmo Weather Widget

To install the project, please make sure you have Node JS, then use the console and type :

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

The server will be listening on **port 8080**, so make sure this port is available. You can access the server site via your web browser at the following address: `localhost:8080`

**Note that by befault, the data will be set to a demo example.** To change that, please go to the `src/index.ts` file and change the `demoMode` boolean to false. Also, to avoid the `Data could not be loaded` error, go to the `api/netatmo.ts` file and enter your own access token, then reload the server.