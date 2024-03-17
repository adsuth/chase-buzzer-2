import { useAtom } from "jotai"
import { useState } from "react"
import { socketAtom } from "../../atoms"
import { SOCKET_ORIGIN } from "../../env"

export default function GameManagementButtons() {
  const [ socket ] = useAtom( socketAtom )
  const [gameId, setGameId] = useState<string>("");
  const [user, setUser] = useState<string>("");

  // function handleHostSetup()
  // {
  //   if ( _gameIdInput.current === null ) return console.error( "[ adsu ] :: ID input couldnt be found" )
  //   socket?.emit( "host_new_game", _gameIdInput.current.valueAsNumber )
  // };

  const handleJoinGame = async (type: "player" | "chaser") => {
    if (!gameId) { return console.error("No game ID provided"); }
    if (!user) { return console.error("No user name provided"); }
  
    const res = await fetch(`${SOCKET_ORIGIN}/join_game`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: gameId,
        userName: user,
        userType: type,
      })
    })

    if (res.status !== 200) { return alert(`Error: No session with ID "${gameId}"`); }

    socket?.emit("join_game");
  };

  const handleClearUsers = async () => {
    await fetch(`${SOCKET_ORIGIN}/remove_users`, {
      method: "POST",
    })
  };

  return (<>
    <div>
        <input onChange={(e) => setGameId(e.target.value)} type="text" placeholder="Game ID"/>
        <input onChange={(e) => setUser(e.target.value)} type="text" placeholder="User Name"/>
      </div>
    <div>
      <button onClick={() => handleJoinGame("player")}>Join as Player</button>
      <button onClick={() => handleJoinGame("chaser")}>Join as Chaser</button>
      <button onClick={handleClearUsers}>CLEAR USERS</button>
      {/* <button onClick={handleHostSetup}>Host a Game</button> */}
    </div>
  </>)
}
