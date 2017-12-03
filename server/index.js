const express = require('express')
const {join} = require ('path')
const basedir = join(__dirname, '..', '/public')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()
const isProd = process.env.NODE_ENV === 'production'
const isDebug = process.env.NODE_ENV === 'debug'
// HTML5 pushState: serve static files or index.html for everything else
app.use(express.static(basedir))


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())

app.use('/', routes);
app.get('*', (req, res) => res.sendFile('index.html', { root: basedir }))

// Start listening
function start({port}, callback) {
  app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}/`)
    callback && callback()
  })
  return app
}
module.exports = {
  start,
  isProd,
  isDebug,
  app
}
