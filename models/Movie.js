const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
   director_id: Schema.Types.ObjectId,
   title: {
       type: String,
       required: true
   },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
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