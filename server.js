//DEPENDENCIES

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const knex = require('knex');
const cors = require('cors');


const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const entry = require('./controllers/entry');



const app = express();
const db = knex({
    client: 'pg',
    connectionString : process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});


//MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




//ENDPOINTS
app.get('/', (req,res) => {
    res.json('success');
});

app.post('/signin', cors(), signIn.handleSignIn(db, bcrypt));
app.post('/register', cors(), register.handleRegister(db, bcrypt));
app.get('/profile/:id', cors(), profile.handleProfile(db));
app.post('/image', cors(), image.handleImageUrl);
app.put('/entry', cors(), entry.handleEntryUpdate(db));



app.listen(process.env.PORT || 3000, () => {
    console.log(`Application is running on port ${process.env.PORT || 3000}`);
});

