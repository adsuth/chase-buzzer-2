const http = require("http")
const express = require("express")
const session = require("express-session")
const cors = require( "cors" )
const socketIo = require("socket.io")
const bodyParser = require("body-parser")

require('dotenv').config( {path: '../.env'} );

const app     = express()
const clientLocalhost = `http://127.0.0.1:${process.env.CLIENT_PORT}`
const port    = process.env.PORT || 4000

const GAMES = ["1234"]
var PLAYERS = []
var CHASERS = []

app.use( bodyParser.urlencoded({extended: true}) )
app.use( bodyParser.json() );
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
  const id = req.body.gameId;
  const user = req.body.userName;
  const type = req.body.userType;

  const validGame = GAMES.includes(id);
  if (!validGame) { return res.status(400).send({}); }

  type === "player" ?
    PLAYERS.push({ id: Math.random(), name: user, pass: false }) :
    CHASERS.push({ id: Math.random(), name: user, pass: false })

  return res.status(200).send({});
})

app.post("/remove_users", (req, res) => {
  PLAYERS = [];
  CHASERS = [];
});

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

  socket.on("join_game", () => {
    socket.emit("lobby_setup", { PLAYERS: PLAYERS, CHASERS: CHASERS })
  })
})


server.listen( port, () => {
  console.log(`Connected and listening on port ${port}`)
})
