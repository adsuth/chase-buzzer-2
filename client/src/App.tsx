import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import "./App.css"
import { SOCKET_ORIGIN } from "./env"
import { gameIdAtom, pageStateAtom, socketAtom } from "./atoms"
import { PageStateEnum } from "./definitions"
import { useAtom } from "jotai"
import Home from "./views/Home"

function App() {
  const [ pageState, setPageState ] = useAtom( pageStateAtom )
  const [ socket, setSocket ] = useAtom( socketAtom )
  const [ id, setId ] = useAtom( gameIdAtom )

  function getPageContent()
  {
    switch ( pageState )
    {
      case PageStateEnum.HOST_SETUP:
        return <h1>todo: add HOST_SETUP page (id is {id})</h1>;

      default:
        return <Home />
    }
  }
  
  useEffect( () => {
    const socket = io( SOCKET_ORIGIN, {} )
    setSocket( socket )
  }, [] )

  useEffect( () => {
    if ( socket === null ) return

    socket.on( "connect", ()   => console.log(socket.id) )
    // socket.on( "disconnect", () => setTime("server disconnected"))

    socket.on("connect_error", () => { setTimeout(() => socket.connect(), 5000) })
    socket.on( "host_setup", (id: number) => {
      setId( id )
      setPageState( PageStateEnum.HOST_SETUP )
    } )
    
  }, [ socket ] )


  return getPageContent()
}

export default App
