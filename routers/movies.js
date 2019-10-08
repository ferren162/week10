const mongoose = require('mongoose');

var Actor = require('../models/Actor');
var Movie = require('../models/Movie');

module.exports = {

    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    removeActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.params.actorId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.pull(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },

    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },
    
    getY1Y2: function (req, res) {
        Movie.where('year').gte(Number(req.params.year1)).lte(Number(req.params.year2)).exec(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },
    
    increment: function (req, res) {
        Movie.updateMany({ year: { $gt: 1995 } }, { $inc: { year: 7 } }, { upsert: true }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    delaYear: function (req, res) {
        Movie.findByIdAndDelete({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    }

    // delaYear: function (req, res) {
    //     Movie.deleteMany({ 'year': { $lt: Number(req.params.aYear) } }, function (err) {
    //         if (err) return res.status(400).json(err);
    //         res.json();
    //     });
    // }
};