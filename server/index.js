const http = require("http")
const express = require("express")
const session = require("express-session")
const cors = require( "cors" )
const socketIo = require("socket.io")
const bodyParser = require("body-parser")

require('dotenv').config( {path: '../.env'} );

const app     = express()
const clientLocalhost = `http://localhost:${process.env.CLIENT_PORT}`
const port    = process.env.PORT || 4000

const GAMES = []

app.use( bodyParser.urlencoded({extended: true}) )
app.use( express.static("public") )
app.use( cors( {origin: [clientLocalhost]} ) )
app.use( session({
  secret: "doesntmatter",
  resave: false,
  saveUninitialized: false
}) )

app.get("/play", (req, res) => {
  // todo: maybe use router, this should show game page specific to host/player
})

app.post("/join_game", (req, res) => {
  // todo: this should check if the session exists
  const id = req.body
  const validGame = GAMES.includes(id)

  console.log( {id, GAMES} )

  return validGame ? res.status( 200 ).send({}) : res.status( 400 ).send({})
})

const server = http.createServer( {}, app )
const io = socketIo( server, {
  cors: {
    origin: clientLocalhost
  }
})


io.on( "connection", (socket) => {
  console.log("a user connected")

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  //initial info on connection
  socket.emit( "time", Date.now() )

  socket.on( "host_new_game", () => {
    console.log( "new game requested to be hosted" )
    const newGameId = "1234" // todo: generate randomly

    if ( !GAMES.includes( newGameId ) ) 
      GAMES.push( newGameId )

    socket.emit( "host_setup", newGameId )
  } )

})


server.listen( port, () => {
  console.log(`Connected and listening on port ${port}`)
})
