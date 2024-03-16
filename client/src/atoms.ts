import { atom } from "jotai";
import { PageStateEnum } from "./definitions";
import { Socket } from "socket.io-client";

export const pageStateAtom = atom<PageStateEnum>( PageStateEnum.HOME )
export const socketAtom = atom<Socket | null>( null )
export const gameIdAtom = atom<number>( -1 )