import { User } from "../types";

export const fakeUsers: { [key: string]: User[] } = {
  players: [{
    id: 1,
    name: "Player 1",
    pass: false
  },{
    id: 2,
    name: "Player 2",
    pass: false
  }, {
    id: 3,
    name: "Player 3",
    pass: false
  }, {
    id: 4,
    name: "Player 4",
    pass: false
  }],
  chasers: [{
    id: 5,
    name: "Chaser 1",
    pass: false
  },{
    id: 6,
    name: "Chaser 2",
    pass: false
  }, {
    id: 7,
    name: "Chaser 3",
    pass: false
  }, {
    id: 8,
    name: "Chaser 4",
    pass: false
  }],
};