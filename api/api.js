const express = require('express')
const router = express.Router()
const URL = require('../models/url')

router.get('/new/:url(*)', ( req, res, next ) => {
    const re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    if ( re.test(req.params.url) ){
        URL.create({ link: req.params.url }).then( url => {
            res.send({
                orginal_url: req.params.url,
                url: `${req.protocol}://${req.get('host')}/${url._id}`
            })
        })
    } else {   
        res.send({ error: "please enter valid URL" })
    }
})

module.exports = router