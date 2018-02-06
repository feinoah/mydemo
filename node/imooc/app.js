/**
 * Created by ifeng on 2018/1/2.
 */
var express = require('express')
//设置端口，从环境变量取值或设置为3000，可以用在命令行里面使用PORT=4000来设置端口
var path = require('path')
var port = process.env.PORT || 3000
//启动web服务器，赋值给app
var app = express()
var mongoose = require('mongoose')
//
var bodyParser = require('body-parser')

var Movie = require('./views/models/movie')

var _ = require('underscore')
//数据库地址 imooc不存在会自动创建,只要有mongodb,并地址无措
var mongodbUrl='mongodb://localhost:27017/imooc'
//
mongoose.Promise = global.Promise
var db=mongoose.connect(mongodbUrl,{useMongoClient:true})
db.on('error', function(error){
    console.log('数据库连接失败：' + error);
});
db.once('open', function(){
    console.log('数据库连接成功');
});
//设置本地方法moment
app.locals.moment=require('moment')

//设置视图的根目录
app.set('views', './views/pages')
//设置默认的模版引擎
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended: true})) //对表单提交的数据进行格式化
app.use(express.static(path.join(__dirname, 'public'))) //设置静态文件路径
//监听端口
app.listen(port)
//打印一行日志，在控制面板里面可以看到服务是否启动

console.log('server start on port:' + port)

//

//启动命令 node app.js运行本文件，同时可以用环境变量的方式设置端口 PORT=4000 node app.js 这时端口是4000
//index page
//路由
//index router
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: 'imooc 首页',//向首页返回一个变量title
            movies: movies
        })
    })
})
//deail router
app.get('/movie/:id', function (req, res) {
    var id = req.params.id
    if(id){
        Movie.findById(id, function (err, movie) {
            res.render('detail', {
                title: 'imooc 详情页' + movie.title,//向首页返回一个变量title
                movie: movie
            })
        })
    }

})

//admin router
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'imooc 后台',//向首页返回一个变量title
        movie: {
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    })
})
//admin update router
app.get('/admin/update/:id', function (req, res) {
    console.log('update')
    var id = req.params.id
    console.log(id)
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
})
//admin post router
app.post('/admin/movie/new', function (req, res) {

    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie
    console.log(id)
    if (id!='') {
        console.log('update...'+id)
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            console.log('update...'+id+'1')
            _movie =_.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        console.log('save...')
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }

            res.redirect('/movie/' + movie._id)
        })
    }
})
//list router
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: 'imooc 列表',//向首页返回一个变量title
            movies: movies
        })
    })
})
//list delete
app.delete('/admin/list',function(req,res){
    var id=req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
})
