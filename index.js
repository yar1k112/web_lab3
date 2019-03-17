var express = require('express');
var path = require('path');
var pug = require('pug');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

const fs = require('fs');

var pictures = JSON.parse(fs.readFileSync('./pictures.json'));
console.log(pictures);

var users = JSON.parse(fs.readFileSync('./users.json'));
console.log(users);

var auctions = JSON.parse(fs.readFileSync('./auctions.json'));
console.log(auctions);

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/pictures', function(req, res) {
	res.render('pictures', {
		pictures: pictures
	})
})

app.put('/pictures', function(req,res) {
	pictures[req.body.id - 1].id = req.body.id
	pictures[req.body.id - 1].author = req.body.author
	pictures[req.body.id - 1].name = req.body.name
	pictures[req.body.id - 1].description = req.body.description
	pictures[req.body.id - 1].begin = req.body.start
	pictures[req.body.id - 1].step = req.body.step

	fs.writeFileSync('./pictures.json', JSON.stringify(pictures))
})

app.get('/pictures/participants', function(req,res){
	var participants = [];
	for(let i = 0; i < pictures.length; ++i){
		if(pictures[i].onAuct == true){
			participants.push(pictures[i])
		}
	}
	// console.log(pictures);
	// console.log(participants);
	res.send(pug.compileFile('./views/picturesContent.pug')({
		pictures: participants
	}));
})

app.get('/users', function(req, res) {
	res.render('users', {
		users: users
	})
})

app.put('/users', function(req,res) {
	users[req.body.id - 1].id = req.body.id
	users[req.body.id - 1].name = req.body.name
	users[req.body.id - 1].money = req.body.money

	fs.writeFileSync('./users.json', JSON.stringify(users))
})

app.put('/users/add', function(req,res) {
	var l = users.length

	var newU = {}

	newU.id = l + 1
	newU.name = req.body.name
	newU.money = req.body.money

	users.push(newU)

	fs.writeFileSync('./users.json', JSON.stringify(users))

	res.send(pug.compileFile('./views/usersContent.pug')({
		users: users
	}))
})

app.put('/users/delete', function (req,res) {
	var id = Number(req.body.id)

	console.log("!!!!!!!!! " + id)

	users.splice(id,1)

	for(var i = 1; i <= users.length; ++i){

		users[i-1].id = i;
	}

	fs.writeFileSync('./users.json',JSON.stringify(users))

	// res.render('./views/users', {
	// 	users:users
	// })
	res.send(pug.compileFile('./views/usersContent.pug')({
		users: users
	}))
})

app.get('/auct', function(req, res) {
	res.render('auct.pug', {
		users:users,
		auct:auctions,
		pictures:pictures
	})
})

app.put('/auct',function(req,res) {
	console.log(req.body.id);
	
	console.log(req.body);
	
	auctions[req.body.id - 1].id = req.body.id
	auctions[req.body.id - 1].timeout = req.body.timeout
	auctions[req.body.id - 1].interval = req.body.interval
	auctions[req.body.id - 1].pause = req.body.pause

	fs.writeFileSync('./auctions.json', JSON.stringify(auctions))
})

app.put('/auct/delete', function (req,res) {
	var id = Number(req.body.id)

	console.log("!!!!!!!!! " + id)

	auctions.splice(id,1)

	for(var i = 1; i <= users.length; ++i){

		users[i-1].id = i;
	}

	fs.writeFileSync('./auctions.json',JSON.stringify(auctions))

	// res.render('./views/users', {
	// 	users:users
	// })
	res.send(pug.compileFile('./views/auctContent.pug')({
		users:users,
		auct:auctions,
		pictures:pictures
	}))
})

app.put('/auct/add', function(req,res) {
	var l = auctions.length

	var newU = {}

	console.log(req.body);

	newU.id = l + 1
	newU.date = req.body.date
	newU.pic = req.body.picture
	newU.pic = Number(newU.pic)
	newU.timeout = req.body.timeout
	newU.interval = req.body.interval
	newU.pause = req.body.pause

	auctions.push(newU)

	fs.writeFileSync('./auctions.json', JSON.stringify(auctions))

	res.send(pug.compileFile('./views/auctContent.pug')({
		users:users,
		auct:auctions,
		pictures:pictures
	}))
})

function go() {
	app.listen(3000, function () {
  		console.log('Example app listening on port 3000!');
});
}

go();

exports.start = go;