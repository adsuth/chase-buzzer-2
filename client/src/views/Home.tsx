import { useAtom } from "jotai"
import { pageStateAtom, socketAtom } from "../atoms"
import { PageStateEnum } from "../definitions"
import { useRef } from "react"
import { Socket } from "socket.io-client"
import GameManagementButtons from "./components/GameManagementButtons"

export default function Home() 
{
  return (
    <>
      <h1>Home Page</h1>
      <GameManagementButtons />
    </>
  )
}
