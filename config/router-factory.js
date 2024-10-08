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

app.get('/', (req, res) => res.send('<h1>teste</h1>'));

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

module.exports= app;
// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Servidor está rodando na porta ${PORT}`);
// });
