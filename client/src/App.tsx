import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { SOCKET_ORIGIN } from "./env"
import { gameIdAtom, pageStateAtom, socketAtom } from "./atoms"
import { PageStateEnum } from "./definitions"
import { useAtom } from "jotai"
import { Home, MainScreen } from "./views"
import { User } from "./views/components/MainScreen/types"

import "./App.css"

function App() {
  const [ pageState, setPageState ] = useAtom( pageStateAtom )
  const [ socket, setSocket ] = useAtom( socketAtom )
  const [ id, setId ] = useAtom( gameIdAtom )
  const [ players, setPlayers ] = useState<User[]>([]);
  const [ chasers, setChasers ] = useState<User[]>([]);

  function getPageContent()
  {
    switch ( pageState )
    {
      case PageStateEnum.HOST_SETUP:
        return <h1>todo: add HOST_SETUP page (id is {id})</h1>;
      case PageStateEnum.PLAYING:
        return <MainScreen players={players} chasers={chasers} />;
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
    socket.on("lobby_setup", (data) => {
      setPlayers(data.PLAYERS);
      setChasers(data.CHASERS);
      setPageState(PageStateEnum.PLAYING);
    })
  }, [ socket ] )


  return getPageContent()
}

export default App
