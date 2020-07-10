//DEPENDENCIES

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const entry = require('./controllers/entry');



const app = express();
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


//ENDPOINTS
app.get('/', (req,res) => {
    res.json('Connected!');
});
app.post('/signin', signIn.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.post('/image', image.handleImageUrl);
app.put('/entry', entry.handleEntryUpdate(db));



app.listen(process.env.PORT || 3000, () => {
    console.log(`Application is running on port ${process.env.PORT || 3000}`);
});

