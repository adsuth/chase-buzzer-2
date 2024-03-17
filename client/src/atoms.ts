import { atom } from "jotai";
import { PageStateEnum } from "./definitions";
import { Socket } from "socket.io-client";
import { User } from "./views/components/MainScreen/types";

export const pageStateAtom = atom<PageStateEnum>( PageStateEnum.HOME )
export const socketAtom = atom<Socket | null>( null )
export const gameIdAtom = atom<number>( -1 )
export const playersAtom = atom<User[]>([]);
export const chasersAtom = atom<User[]>([]);