import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImage from './controllers/image.js';

const db = knex({
   client: 'pg',
   connection: {
     host: '127.0.0.1',
     port: 5432,
     user: 'postgres',
     password: 'test',
     database: 'ecom',
   },
 });
 
   const app = express();

   app.use(bodyParser.json());
   app.use(cors());

      app.get('/', (req, res)=>{
        res.send("heellloooo");
      })

      db.select('*').from('users').then(users=> {
         console.log(users);
       })
       
       const saltRounds = 10;
       
       app.use(bodyParser.json());
       app.use(cors());
       
    
       app.post('/signin', (req, res)=>{handleSignIn(req, res, db, bcrypt)});

       app.post('/register', (req, res)=> {handleRegister(req, res, db, bcrypt, saltRounds)});

       app.get('/profile/:id', (req,res)=>{handleProfile(req, res, db)});

       app.put('/image', (req, res)=>{handleImage(req, res, db)});

   app.listen(3000);


//console.log('this is the server')