/**
 * Created by ifeng on 2018/1/9.
 */
var mongoose=require('mongoose')
var MovieSchema=require('../schemas/movie')
var Movie=mongoose.model('Movie',MovieSchema)
module.exports=Movie
