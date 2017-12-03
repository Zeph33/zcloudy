const server = require('./server/')
const port = process.env.PORT || 3333
if(server.isProd || server.isDebug) server.start({port})
module.exports = server.start
