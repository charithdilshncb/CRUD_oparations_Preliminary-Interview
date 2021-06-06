const mongoose = require('mongoose')
const Schema = mongoose.Schema

const catSchema = new Schema({   
catName: {
    type: String,
    required: true,
},
 catAge: {
    type: Number,
    required: true,
},
category: {
    type: String,
    required: true,
},
imageURl: {
    type: String
  }
})

const catmodel = mongoose.model('catModel', catSchema)
module.exports = catmodel