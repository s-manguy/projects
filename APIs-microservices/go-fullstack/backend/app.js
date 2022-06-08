const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

//Connexion Database
//Replace <username>, <password>, <clustername>, <dbname> by your own mongodb elements.
mongoose.connect('mongodb+srv://<username>:<password>@<clustername>.omqq7.mongodb.net/<dbname>?retryWrites=true&w=majority', 
{useNewUrlParser: true,
 useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(()=> console.log('Connexion à MongoDB a échoué !'));


//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
