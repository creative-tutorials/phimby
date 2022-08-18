// expressjs app

var express = require("express");
var app = express();
// cors
var cors = require("cors");
app.use(cors());
// require jwt
var jwt = require("jsonwebtoken");

// whitelist
var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
};
app.use(cors(corsOptions));

// use json
app.use(express.json());
// use url-encoded
app.use(express.urlencoded({ extended: true }));

require("dotenv").config({ path: __dirname + "/./../../.env" });
const PORT = process.env.PORT || 5000;

const users = [
  {
    id: 1,
    name: "John",
    email: "john@mail.com",
    password: "123456",
  },
];

const mvid = Math.floor(Math.random() * 1000000); // random movie id
const movies = [
  {
    id: mvid,
    name: "Spiderman-No-Way-Home",
    length: "2h 28min",
    year: 2021,
    Rating: "PG-13",
    thumbnail: "https://bit.ly/3JOIkTw",
    casts: {
      csj: {
        cstName: "Tom Holland",
        actingName: "Peter Parker",
        DOB: "June 1, 1996",
        Town: "Kingston upon Thames, England, UK",
        ProfilePic: "",
      },
      sjs: {
        cstName: "Zendaya",
        actingName: "MJ",
        DOB: "September 1, 1996 ",
        Town: "Oakland, California, USA",
        ProfilePic: "",
      }
    }
  },
  {
    id: mvid + 1, // add 1 to mvid to avoid duplicate id
    name: "Thor Love and Thunder",
    length: "1h 58min",
    year: 2022,
    Rating: "PG-13",
    thumbnail: "https://bit.ly/3PoAQHY",
  },
  {
    id: mvid + 2,
    name: "The Godfather: Part II",
    length: "3h 22min",
    year: 1974,
    Rating: "R",
    thumbnail: "https://bit.ly/3PmZrwV",
  },
  {
    id: mvid + 3,
    name: "The Dark Knight",
    length: "2h 32min",
    year: 2008,
    Rating: "PG-13",
    thumbnail: "https://bit.ly/3zUyKtS",
  },
  //   KIDS MOVIES
  {
    id: mvid + 4,
    name: "DC League of Super-Pets",
    length: "1h 45min",
    year: 2022,
    Rating: "PG",
    thumbnail: "https://bit.ly/3zQVPNW",
  },
  {
    id: mvid + 5,
    name: "The Lion King",
    length: "1h 48min",
    year: 2019,
    Rating: "PG",
    thumbnail: "https://bit.ly/3du9zH2",
  },
  {
    id: mvid + 6,
    name: "The Shawshank Redemption",
    length: "2h 22min",
    year: 1994,
    Rating: "R",
    thumbnail: "https://bit.ly/3C2CvzX",
  },
  //   BATMAN MOVIES
  {
    id: mvid + 7,
    name: "Batman Begins",
    length: "2h 32min",
    year: 2005,
    Rating: "PG-13",
    thumbnail: "https://bit.ly/3QKlkaJ",
  },
  // THE MATRIX
  {
    id: mvid + 8,
    name: "The Matrix",
    length: "2h 16min",
    year: 1999,
    Rating: "R",
    thumbnail: "https://bit.ly/3dfA0zV",
  },
  // UNCHARTED
  {
    id: mvid + 9,
    name: "Uncharted",
    length: "1h 56min",
    year: 2022,
    Rating: "PG-13",
    thumbnail: "https://bit.ly/3pf9V6V",
  },
  // TRANSFORMERS
  {
    id: mvid + 10,
    name: "Transformers",
    length: "2h 24min",
    year: 2007,
    Rating: "PG-13",
    thumbnail: "https://bit.ly/3SMLmMk",
  },
  {
    id: mvid + 11,
    name: "Morbious",
    length: "1h 44min",
    year: 2022,
    Rating: "PG-13",
    thumbnail: "https://bit.ly/3dsa7gh",
  },
];

const online = {
  message: "Welcome to Phimby, enjoy the best movies and series online.",
  version: "1.0.0",
  appName: "Phimby",
  api: "We are working on it, This is just the local version",
};
// get /
app.get("/", (req, res) => {
  res.send(online);
});

// get all movies
app.get("/api/movies", function (req, res) {
  res.send(movies);
});

// get movie by id
app.get("/api/movies/:id", function (req, res) {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    res.status(404).send("The movie with given id was not found ❌");
  } else {
    res.send(movie);
  }
});

// get movies by movie name
app.get("/api/movies/name/:name", function (req, res) {
  const movie = movies.find((movie) => movie.name === req.params.name);
  if (!movie) {
    res.status(404).send("The movie with given name was not found ❌");
  } else {
    res.send(movie);
  }
});

// get user by id
app.get("/api/users/:id", function (req, res) {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("The user with given id was not found ❌");
  } else {
    res.send(user);
  }
});

// if signup route already has a user with same email then send error
app.post("/api/users/singup", function (req, res) {
  const user = users.find((user) => user.email === req.body.email); // find user with same email as the one in the request body
  if (user) {
    res.status(400).send("User already registered ❌");
  } else {
    users.push(req.body);
    // send the new user with status 201
    res.status(201).send(req.body);
  }
});
// Login user if user exist & generate token for user
app.post("/api/users/login", function (req, res) {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    res
      .status(401)
      .send(
        "Failed to login, please check your email and password and Try Again!"
      );
  } else {
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
    res.status(200).send({ token });
  }
});

// get all users
app.get("/api/users", function (req, res) {
  res.send(users);
});

// delete user account
app.delete("/api/users/:id", function (req, res) {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(401).send("The user with given id was not found ❌");
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send("User deleted successfully ✅");
  }
});

// allow user to reset password
app.put("/api/users/rst", function (req, res) {
  const user = users.find((user) => user.email === req.body.email);
  if (!user) {
    res
      .status(401)
      .send("Email address you entered is not recognised on our database ❌");
  } else {
    user.password = req.body.password;
    res.send(user);
  }
});

// send user a mail if password has been reset
app.post("/api/users/reset", function (req, res) {
  const user = users.find((user) => user.email === req.body.email);
  if (!user) {
    res.status(401).send("The user with given email was not found ❌");
  } else {
    res.send("Password reset link sent to your email");
  }
});

// listen to port
app
  .listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", function (err) {
    console.log(err);
  });
