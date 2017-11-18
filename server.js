const server = require('./server/')
const port = process.env.PORT || 8080
if(server.isProd) server.start({port})
module.exports = server.start
