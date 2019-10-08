const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actors');
const movies = require('./routers/movies');
let path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));


mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoints 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

//Movie RESTFul endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//Lab Tasks
app.delete('/movies/:id', movies.deleteOne);
app.delete('/actors/:id/delMovies', actors.deleteMovies);
app.put('/actors/:actorId/:movieId', actors.removeMovie);
app.put('/movies/:movieId/:actorId', movies.removeActor);
app.post('/movies/:id/actors', movies.addActor);
app.get('/movies/:year1/:year2', movies.getY1Y2);
app.post('/movies/increment', movies.increment);

app.delete('/movies/:aYear/before', movies.delaYear);

app.listen(8080);