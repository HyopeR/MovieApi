const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

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

  /*
  movie.save((error, data) => {
    if(error)
      res.json(error);

    res.json({ status: 1 });
  });
  */

  // Movie Schema üzerinde yapılan tanımlamayla veriyi kaydetmek.
  // Bunu kullanmak daha mantıklı.
  const promise = movie.save();

  promise.then((data) => {
    res.json({ status: 1 });
  }).catch((error) => {
    res.json(error);
  });

});

module.exports = router;
