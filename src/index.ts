import express = require('express');
import path = require('path');

// We will use an Express App, on port 8080 by default
const app = express()
const port: string = process.env.PORT || '8080'

// We will import the Bootstrap for NodeJS packages and add it to our App 
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// We set the EJS views to our app
app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

// We render the homepage when getting the URL
app.get('/', (req: any, res: any) => {
    res.render('home.ejs')
})

app.listen(port, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${port}`)
})