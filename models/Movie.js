const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
   director_id: Schema.Types.ObjectId,
   title: {
       type: String,
       required: [true, '{PATH} alanı zorunludur!'],
       maxlength: [25, '{PATH} alanı {MAXLENGTH} karakterden küçük olmalıdır.'],
       minlength: [1, '{PATH} alanı {MINLENGTH} karakterden büyük olmalıdır.']
   },
    category: {
       type: String,
        maxlength: 30,
        minlength: 1
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    year: {
        type: Number,
        max: 2080,
        min: 1800
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
       type: Date,
       default: Date.now()
    }
});
// 5e7c08b554dace1b40240cb9 necip
// 5e7c090954dace1b40240cba nazım
// 5e7c09cafea21805903e5521 yahya
// 5e7c09d9fea21805903e5522 cahit

module.exports = mongoose.model('movie', MovieSchema);