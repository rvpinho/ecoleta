const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const db = require("./database/db");

//utilizando template engine
nunjucks.configure(["src/views", "src/Login"], {
    express: server,
    noCache: true
});

//Configurar Pasta Publica
server.use(express.static("public"));

// Habilitar o uso do req.body
server.use(express.urlencoded({extended: true}));

//Configurar caminhos da Aplicação
//Página Inicial
server.get("/", (req, res) => {
    return res.render("indexLogin.html");
});

//Criar um Ponto de Coleta
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

    //Inserir dados no BAnco de Dados
    const query =
    `INSERT INTO places (
        name,
        image,        
        address,
        address2,
        state,
        city,
        items,
        userId
    ) VALUES (
        ?,?,?,?,?,?,?,?
    );`;
    
    //req.body: Corpo do Formulário
    const values = [
        req.body.name,
        req.body.image,        
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
        1
    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no Cadastro!");
        }
        return res.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData);
});

//Resultado da Pesquisa
server.get("/search-results", (req, res) => {

    //req.query: Query Strings da url
    const search = req.query.search;

    if(search == "") {
        //Pesquisa Vazia
        return res.render("search-results.html");
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }
        //Mostrar a página HTML com os dados do Banco de Dados
        return res.render("search-results.html", { places: rows });
    });
});

//Deleta Ponto
server.get("/all-results", (req, res) => {
    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err);
        }
        //Mostrar a página HTML com os dados do Banco de Dados
        return res.render("all-results.html", { places: rows });
    });
});

server.post("/deletepoint", (req, res) => {
    
    //Inserir dados no BAnco de Dados
    const query =`DELETE FROM places WHERE id = ${req.body.item};`;

    function afterDeleteData(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no Delete!");
        }
        return res.render("all-results.html", {excluded: true});
    }

    db.run(query, afterDeleteData);
});

server.get("/login", async (req, res) => {
    return res.render("login.html");
});

server.post("/handleLogin", async (req, res) => {
    
    //Coleta valores do forms
    let {username, pass} = req.body;

    const query =`SELECT * FROM users WHERE email = '${username}' AND  password = '${pass}';`;

    function afterLoginData(err, row) {

        if (err || !row || !row.id) {
            return res.render("./partials/error-login.html");
        }

        return res.render("index.html", {name: row.name});
    }

    db.get(query, afterLoginData);
});

server.get("/homeLogin", async (req, res) => {
    return res.render("index.html", {name: "Rafael"});
});

//Ligar Servidor
server.listen(3000);