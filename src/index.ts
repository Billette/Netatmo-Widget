import express = require('express');
import path = require('path');
import {RequestHandler} from './api/netatmo'
import {WeatherInfos} from './infos'

// We will use an Express App, on port 8080 by default
const app = express()
const port: string = process.env.PORT || '8080'

// We will use our request handler to manage the API requests
const requestHandler: RequestHandler = new RequestHandler();

// We will import the Bootstrap for NodeJS packages and add it to our App 
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// We set the EJS views to our app
app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

// We render the homepage when getting the URL
app.get('/', (req: any, res: any) => {

    requestHandler.ParseData((err: Error, allInfos: WeatherInfos[]) => {
        if(err)
        {
            console.error('Error while parsing data')
            res.status(400).send('Data could not be loaded');
        } else if(allInfos === []){
            console.error("Unable to find any weather informations");
            res.render('home.ejs', {infos: []})
        } else {
            res.render('home.ejs', {infos: allInfos})
        }
    })
})


app.listen(port, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${port}`)
})