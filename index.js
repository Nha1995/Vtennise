const express = require("express");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-type");
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

let users = [
  {
    id: 0,
    age: 25,
    birthday: "05.12.1995",
    mail: "admin@mail.ru",
    name: "Нарек",
    password: "admin",
    phone: "79208999988",
    surname: "Акопян",
  },
  {
    id: 1,
    age: 33,
    birthday: "03.06.1987",
    mail: "test@mail.ru",
    name: "Виктория",
    password: "test",
    phone: "79058794256",
    surname: "Николаева",
  },
];
let players = [
  {
    id: 1,
    games: [],
    wins: 0,
    points: 0,
    rank: "-",
  },
  {
    id: 0,
    games: [],
    wins: 0,
    points: 0,
    rank: "-",
  },
];
let duels = [];
let userid = 2;
let duelid = 0;

//POST
app.post("/register", (req, res) => {
  users.push({
    id: userid++,
    ...req.body,
  });
  players.push({
    id: userid - 1,
    games: [],
    wins: 0,
    points: 0,
    rank: "-",
  });
  res.status(200).send("Пользователь успешно добавлен");
});

app.post("/duels", (req, res) => {
  duels.push({
    id: duelid++,
    ...req.body,
  });
  res.status(200).send(duels);
});

//PUT
app.put("/duel/:id", (req, res) => {
  const duel = duels.find((duel) => duel.id === +req.params.id );
  duel.accepted = req.body.accepted;
  res.status(200).send(duel);
});

app.put("/ignore/duel/:id", (req, res) => {
  const duel = duels.find((duel) => duel.id === +req.params.id );
  duel.completed = true;
  duels.push(duel);
  res.status(200).send(duel);
});

app.put("/win/duel/:id", (req, res) => {
  const duel = duels.find((duel) => duel.id === +req.params.id );
  duel.completed = req.body.completed;
  duel.winner = req.body.winner;
  const player1 = players.find((player) => {
    if (req.body.id1 === player.id) {
      return player;
    }
  });
  const player2 = players.find((player) => {
    if (req.body.id2 === player.id) {
      return player;
    }
  });
  player1.games.push(duel);
  player2.games.push(duel);
  duels.push(duel);
  res.status(200).send(duel);
});

//GET
app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/duels", (req, res) => {
  res.status(200).send(duels);
});

app.get("/user/:id", (req, res) => {
  const user = users[req.params.id];
  res.status(200).send(user);
});

app.get("/players", (req, res) => {
  res.status(200).send({ players, duels });
});

app.get("/player/:id", (req, res) => {
  const player = players[+req.params.id];
  const duelsWithThisPlayer = duels.filter((duel) => {
    if (
      (duel.id1 === +req.params.id || duel.id2 === +req.params.id) &&
      duel.completed === false
    ) {
      return duel;
    }
  });
  res.status(200).send({
    player: player,
    duels: duelsWithThisPlayer,
  });
});

app.get("/duel/:id", (req, res) => {
  const duel = users[req.params.id];
  res.status(200).send(duel);
});

app.listen(3001);
