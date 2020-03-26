const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

router.get('/', (req, res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'director_movies'
      }
    },
    {
      $unwind: {
        path: '$director_movies',
        // Joinlenmeyen directorları gösterme.
        preserveNullAndEmptyArrays: true,

      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio',
        },
        director_movies: {
          $push: '$director_movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        director_movies: '$director_movies'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json(error);
  });
});

router.get('/:director_id', (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'director_movies'
      }
    },
    {
      $unwind: {
        path: '$director_movies',
        // Joinlenmeyen directorları gösterme.
        preserveNullAndEmptyArrays: true,

      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio',
        },
        director_movies: {
          $push: '$director_movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        director_movies: '$director_movies'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json(error);
  });
});

router.put('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      {
        new: true
      }
  );

  promise.then((director) => {
    if(!director)
      next({ message: 'The director was not found.' });
    res.json(director);
  }).catch((error) => {
    res.json(error);
  });
});

router.post('/', (req, res) => {
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json(error);
  });
});

module.exports = router;