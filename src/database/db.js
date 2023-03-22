//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//iniciar o objeto do Banco de Dados
const db = new sqlite3.Database("./src/database/database.db");

// exportar ando de Daos
module.exports = db;

//Utilizar o objeto do Banco de Dados
db.serialize(() => {
    //Criar tabela de usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT
        );
    `);
    
    //Criar tabela de Locais
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT,
            userId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES users(id)
        );
    `);

    /*
    //inserir dados

    //função callback de confirmação 
    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Cadastrado com Sucesso");
        console.log(this);
    }

    //inserir usuário
    const queryUser = `
    INSERT INTO users (
        name,
        email,
        password
    ) VALUES (
        ?,?,?
    );
    `;

    const user = [
        "Rafael",
        "admin@email.com",
        "12345678"
    ];

    db.run(queryUser, user, afterInsertData);
    

    //Inserir locais
    const queryLocal =`
    INSERT INTO places (
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
    );
    `

    const local1 = [
        "Colectoria",
        "https://images.unsplash.com/photo-1579061201641-1e98ff03f7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=937&q=80",
        "Guilherme Gemballa, Jardin América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Residuos Eletroônicos, Lâmpadas",
        1
    ];

    const local2 = [
        "Papersider",
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Guilherme Gemballa, Jardin América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papeis e Papelão",
        1
    ];

    db.run(queryLocal, local1, afterInsertData);
    db.run(queryLocal, local2, afterInsertData);
    */
});


