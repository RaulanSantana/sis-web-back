const express = require('express');
const path = require('path');
const routes = require('./router-files'); 

const app = express(); 

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Headers', '*'); 
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH'); 
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.use(express.json());
app.use(express.static('public'));

app.use('/public/images', express.static(path.join(__dirname, '..', 'public', 'images'))); 

routes.forEach(filename => {
    app.use(require(filename));
});



module.exports= app;

