const express = require("express");
const path = require("path");
const app = express();

const PUERTO = 3000;
let users= [{
  user:"admin",
  password:"1234",
},
{ user: "max",
  password: "max",
}
];
// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(__dirname +"/client"));

// GET inicial, retorna la página login.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname,"client/login.html"));
});

// POST a /login, verifica que user y password sean de un usuario registrado, en ese caso
// avisa que está todo bien y redirecciona al inicio, sino mensaje de error
app.post("/login", function (req, res) {
  let flag = false;
  for (let i = 0; i < users.length; i++) {
    if (req.body.userLogin === users[i].user && req.body.passwordLogin === users[i].password) {
      flag = true;
      break;
    }    
  }
  if(!flag) {
    res.sendFile(path.join(__dirname, "client/login.html"));
  }
  else{
    res.sendFile(path.join(__dirname, "client/home.html"));
  }
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "client/register.html"));
});

app.post("/register", function (req, res) {
  let flag = false;
  if(req.body.password === req.body.passwordRepeat){
    for (let i = 0; i < users.length && !flag; i++) {
      if (req.body.user === users[i].user ) {
        flag = true;   
      }    
    }
    if(!flag) {
      users.push({user: req.body.user, password: req.body.password});
      res.sendFile(path.join(__dirname, "client/home.html"));
    }
    else{
      res.sendFile(path.join(__dirname, "client/register.html"));
    }
  }
  else{
    res.sendFile(path.join(__dirname, "client/register.html"));
  }
  
});

// Inicio server
app.listen(PUERTO, function () {
  console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});
