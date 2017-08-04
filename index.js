const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const pg = require('pg')
const URL = require('./models/url')

const app = express()

// Template engine
app.set('view engine', 'ejs')

// Connect to mongodb
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/urlShort')
mongoose.Promise = global.Promise

app.use(bodyParser.json())
  

app.get('/', ( req, res ) => {
  res.render('index')
})

// Init routs
app.use('/api', require('./api/api'))

app.get('/:id', ( req, res, next ) => {
    URL.findOne({ _id: req.params.id }).then( url => {
      if( url ) res.redirect( url.link ) 
      else res.send({ error: "This url is not on the database." })
    })
})

// 404 Error
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that! 404 ERROR")

})

// Error Handling middleware
app.use(( err, req, res, next ) => {
    //console.log(err)
    res.status(422).send({
        error: err.message
    })
})

// Listen for requests
const port = process.env.PORT || 3000
app.listen( port, ( ) => {
  console.log(`now listening for port ${port}`)
})