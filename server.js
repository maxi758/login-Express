const express = require("express");
const path = require("path");
const alert = require("alert");
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
app.use(express.static(path.join(__dirname, "cliente")));

// GET inicial, retorna la página index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/login.html"));
});
// POST a /login, verifica que user y password sean de un usuario registrado, en ese caso
// avisa que está todo bien y redirecciona al inicio, sino mensaje de error
app.post("/login", function (req, res) {
  let flag = false;
  for (let i = 0; i < users.length; i++) {
    if (req.body.userLogin === users[i].user && req.body.passwordLogin === users[i].password) {
      flag = true;
      alert("se ha conectado correctamente");
      res.redirect("/");
    }    
  }
  if(!flag) {
    alert("usuario y/o contraseña incorrectos");
    res.redirect("/login");
  }
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/register.html"));
});

app.post("/register", function (req, res) {
  let flag = false;
  if(req.body.password === req.body.passwordRepeat){
    for (let i = 0; i < users.length; i++) {
      if (req.body.user === users[i].user ) {
        flag = true;   
      }    
    }
    if(!flag) {
      users.push({user: req.body.user, password: req.body.password});
      alert("Registro exitoso");
      res.redirect("/login");
    }
    else{
      alert("Usuario ya registrado");
      res.redirect("/register");
    }
  }
  else{
    alert("las contraseñas ingresadas no coinciden");
    res.redirect("/register");
  }
  
});

// Inicio server
app.listen(PUERTO, function () {
  console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});
