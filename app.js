const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')

const homeController = require('./controllers/home')
const recentChartController = require('./controllers/recentChart')
const newestChartController = require('./controllers/newestChart')
const genreChartController = require('./controllers/genreChart')
const searchController = require('./controllers/search');

let port = process.env.PORT;
if (port == null || port == ""){
  port = 4000;
}
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port, ()=>{
  console.log('App listening ...')
})


app.get('/', homeController)

app.get('/recentChart', recentChartController)

app.get('/newestChart', newestChartController)

app.get('/genreChart', genreChartController)

app.get('/search', searchController)

/*
app.get('/', (req,res)=>{
  res.render('index');
})

app.get('/recentChart', (req,res)=>{
  res.render('recentChart');
})

app.get('/newestChart', (req,res)=>{
  res.render('newestChart');
})

app.get('/genreChart', (req,res)=>{
  res.render('genreChart');;
})

app.get('/search', (req,res)=>{
  res.render('search');;
})
*/