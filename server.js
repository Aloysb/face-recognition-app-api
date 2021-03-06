const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require ('./controllers/register');
const signIn = require ('./controllers/signIn');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image')

const saltRound=10;

const db = knex({
	client:'pg',
	connection: {
		host:'127.0.0.1',
		user: 'Aloys',
		password: '',
		database: 'face-recognition',
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send('This is working!');
})

app.post('/signin', (req,res) => {sigginIn.handleSignIn(req,res,db,bcrypt,saltRound)});
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt,saltRound)});
app.get('/profile/:id', (req,res) => {profile.handleProfileGet (req,res,db)});
app.put('/image', (req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)});


app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${procces.env.PORT}`);
})
