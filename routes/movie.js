const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  const promise = Movie.find({ });

  promise.then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json(error);
  });
});

//Top 10 List.
router.get('/top10', (req, res) => {
  const promise = Movie.find({ }).limit(10).sort({ imdb_score: -1 });

  promise.then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json(error);
  });
});

router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found.' });
    res.json(movie);
  }).catch((error) => {
    res.json(error);
  });
});

router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      //Alttaki parametre response'nin yeni günceli döndürmesini sağlar.
      {
        new: true
      }
  );

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found.' });
    res.json(movie);
  }).catch((error) => {
    res.json(error);
  });
});

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found.' });
    res.json(movie);
  }).catch((error) => {
    res.json(error);
  });
});

router.post('/', (req, res, next) => {

  // Klasik yöntemli esnek yöntem.
  /*
  const { title, imbd_score, category, country, year } = req.body;

  const movie = new Movie({
    title: title,
    imbd_score: imbd_score,
    category: category,
    country: country,
    year: year
  });
   */

  // Değiken sayımız çok olduğunda tercih edilebilir.
  const movie = new Movie(req.body);

  // Movie Schema üzerinde yapılan tanımlamayla veriyi kaydetmek.
  // Bunu kullanmak daha mantıklı.
  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json(error);
  });
});

// Year Between
router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find(
        {
          year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
        }
      );

  promise.then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json(error);
  });
});

module.exports = router;
