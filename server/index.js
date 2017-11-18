const express = require('express')
const {join} = require ('path')
const basedir = join(__dirname, '..', '/public')

const app = express()
const isProd = process.env.NODE_ENV === 'production'

// HTML5 pushState: serve static files or index.html for everything else
app.use(express.static(basedir))

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
  isProd
}