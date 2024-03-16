import { useAtom } from "jotai"
import React, { useRef } from "react"
import { socketAtom } from "../../atoms"
import { SOCKET_ORIGIN } from "../../env"

export default function GameManagementButtons() {
  const [ socket ] = useAtom( socketAtom )
  const _gameIdInput = useRef<HTMLInputElement>( null )

  function handleHostSetup()
  {
    if ( _gameIdInput.current === null ) return console.error( "[ adsu ] :: ID input couldnt be found" )
    socket?.emit( "host_new_game", _gameIdInput.current.valueAsNumber )
  }

  async function handleJoinGame()
  {
    if ( _gameIdInput.current === null ) return console.error( "[ adsu ] :: ID input couldnt be found" )
    const id = _gameIdInput.current.value
  
    const res = await fetch( `${SOCKET_ORIGIN}/join_game`, {
      method: "POST",
      body: id
    } )

    console.log( {status: res.status, id} )
    
    if ( res.status !== 200 ) return alert( `Error: No session with ID "${id}"` )

    console.log( {status: res.status, id} )


    // todo actually make this do what its supposed to  
    alert( "Found session, joining" )
  }
  return (<>
    <div>
        <input ref={_gameIdInput} type="text" placeholder="Game ID"/>
      </div>
    <div>
      <button onClick={handleJoinGame}>Join Game</button>
      <button onClick={handleHostSetup}>Host a Game</button>
    </div>
  </> )
}
