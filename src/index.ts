import express = require('express');
import path = require('path');
import {RequestHandler} from './api/netatmo'

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
    res.render('home.ejs');
    requestHandler.LoadParisWeather( (err: Error, result: any) => {
        if(err)
            return console.log('Error while loading data')
        else {
            var measures = result.body[0].measures

            //console.log(measures['02:00:00:2c:80:a8'])
            for (var key in measures) {
                if (measures.hasOwnProperty(key)) {
                    console.log(key + " -> " + measures[key]);
                }
            }

            console.log('Paris informations loaded')
        }
        
    })
})


app.listen(port, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${port}`)
})