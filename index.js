// require your server and launch it
const server = require('./api/server.js')



const port = 9001;
server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})