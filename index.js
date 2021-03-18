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
  const duel = duels.find((duel) => duel.id === +req.params.id);
  duel.accepted = req.body.accepted;
  res.status(200).send(duel);
});

app.put("/ignore/duel/:id", (req, res) => {
  const duel = duels.find((duel) => duel.id === +req.params.id);
  duel.completed = true;
  duels.push(duel);
  res.status(200).send(duel);
});

app.put("/win/duel/:id", (req, res) => {
  const duel = duels.find((duel) => duel.id === +req.params.id);
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
  if (player1.id === req.body.winner) {
    player1.wins++;
    player1.points += 25;
  }
  if (player2.id === req.body.winner) {
    player2.wins++;
    player2.points += 25;
  }
  players.sort((player1, player2) => {
    let rank1 = player1.points;
    let rank2 = player2.points;
    if (rank1 > rank2) {
      return -1;
    }
    if (rank1 < rank2) {
      return 1;
    }
  });
  players.forEach((player, index) => {
    player.rank = index + 1;
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

app.get("/players/ratings", (req, res) => {
  let sortPlayers = players.sort((player1, player2) => {
    let rank1 = player1.rank;
    let rank2 = player2.rank;
    if (rank1 > rank2) {
      return 1;
    }
    if (rank1 < rank2) {
      return -1;
    }
  });
  let result = [];
  sortPlayers.forEach((player) => {
    const user = users.find((user) => user.id === player.id);
    result.push({
      ...player,
      name: user.name,
      surname: user.surname,
    });
  });
  res.status(200).send(result);
});

app.put("/search", (req, res) => {
  let filterUsers = [];
  let filterPlayers = [];
  let result = [];

  if (req.body.name) {
    if (req.body.name.indexOf(" ") > -1) {
      let name = req.body.name.split(" ")[0];
      let surname = req.body.name.split(" ")[1];
      const i = surname.length - 1;

      users.forEach((user) => {
        if (user.name === name && user.surname.substr(0, i) == surname) {
          filterUsers.push(user);
        }
      });
    } else {
      const i = req.body.name.length - 1;

      users.forEach((user) => {
        if (user.name.substr(0, i) == req.body.name) {
          filterUsers.push(user);
        }
      });
    }
    if (filterUsers.length == 0) {
      res.status(404);
    }
  }

  if (req.body.ageFrom) {
    filterUsers = filterUsers.filter((user) => user.age >= req.body.ageFrom);
    if (filterUsers.length == 0) {
      res.status(404);
    }
  }

  if (req.body.rateFrom) {
    filterPlayers = players.filter(
      (player) => player.points >= req.body.rateFrom
    );
    if (filterPlayers.length == 0) {
      res.status(404);
    }
  }

  if (req.body.games) {
    filterPlayers = filterPlayers.filter(
      (player) => player.games.length >= req.body.games
    );
    if (filterPlayers.length == 0) {
      res.status(404);
    }
  }

  for (let i = 0; i < filterPlayers.length; i++) {
    for (let j = 0; j < filterUsers.length; j++) {
      if (filterPlayers[i].id == filterUsers[j].id) {
        result.push({
          name: filterUsers[j].name,
          surname: filterUsers[j].surname,
          age: filterUsers[j].age,
          games: filterPlayers[i].games.length,
          wins: filterPlayers[i].wins,
          points: filterPlayers[i].points,
          rank: filterPlayers[i].rank,
        });
      }
    }
  }
  res.status(200).send(result);
});

app.get("/history/:id", (req, res) => {
  let itsMe,
    notMe,
    result = {};
  const player = players.find((player) => player.id === +req.params.id);
  let newGames = [];
  player.games.forEach((game) => {
    const player1 = users.find((user) => game.id1 === user.id);
    const player2 = users.find((user) => game.id2 === user.id);

    if (player1.id == req.params.id) {
      itsMe = player1;
      notMe = player2;
      result = {
        player1: itsMe,
        player2: notMe,
        win: game.winner,
      };
    } else {
      itsMe = player2;
      notMe = player1;
      result = {
        player1: notMe,
        player2: itsMe,
        win: game.winner,
      };
    }
    newGames.push(result);
  });

  res.status(200).send(newGames);
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
