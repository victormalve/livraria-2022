//database
const { ftruncateSync } = require("fs")
const { builtinModules } = require("module")

async function conecta(){
    const mysql = require("mysql2/promise")
    const conn = await mysql.createConnection({
        host: "localhost",
        user: "victor_malve",
        password: "Victor9901*",
        database:"filmes"
    })
    console.log("mySQL conectado!")
    global.connection = conn
    return connection
}

//conecta()

async function selectFilmes(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM videos")
    //console.log(rows)
    return rows
}

async function selectLivros(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM livros ORDER BY livros_id DESC")
    //console.log(rows)
    return rows
}

async function selectSingle(id){
    const conectado = await conecta() 
    const values = [id]
    const [rows] = await conectado.query("SELECT * FROM livros Where livros_id=?",values) 
    //console.log(rows)
    return rows
}

async function insertLivro(livro){
    const conectado = await conecta() 
    const values = [livro.titulo,livro.resumo,livro.valor,livro.imagem]
    const [rows] = await conectado.query("INSERT INTO livros(titulo,resumo,valor,imagem) VALUES (?,?,?,?)",values)  
    console.log("Insert OK")
    return rows
}

async function insertContato(contato){
    const conectado = await conecta() 
    const values = [contato.nome,contato.sobrenome,contato.email,contato.mensagem]
    const [rows] = await conectado.query("INSERT INTO contato(nome,sobrenome,email,mensagem) VALUES (?,?,?,?)",values)  
    console.log("InsertContato OK")
    return rows
}
//insertContato({nome:"Michael", sobrenome:"Jackson",email:"souomenor@gmail.com",mensagem:"Musica"})

async function insertUsuario(usuarios){
    const conectado = await conecta() 
    const values = [usuarios.nome,usuarios.email,usuarios.telefone,usuarios.senha,usuarios.conf_senha]
    const [rows] = await conectado.query("INSERT INTO usuarios(nome,email,telefone,senha,conf_senha) VALUES (?,?,?,?,?)",values)  
    console.log("Insertusuario OK")
    return rows
}

async function selectPromo(id){
    const conectado = await conecta() 
    const [rows] = await conectado.query("SELECT * FROM livros WHERE promo=1 ") 
    //console.log(rows)
    return rows
}

async function selectUsers(email,senha){
    const conectado = await conecta() 
    const values = [email,senha]
    const [rows] = await conectado.query("SELECT * FROM usuarios WHERE email=? AND senha=?",values) 
    //console.log(rows)
    return rows
}

async function updatePromo(id,promo){
    const conectado = await conecta();
    const values = [id,promo]
    return await conectado.query("UPDATE livros set promo=? WHERE livros_id=?",values)
}

updatePromo(0,1)

async function selectCarrinho(){
    const conectado = await conecta() 
    const [rows] = await conectado.query("SELECT * FROM carrinho ORDER BY idcarrinho DESC") 
    //console.log(rows)
    return rows
}

async function insertCarrinho(carrinho){
    const conectado = await conecta() 
    const values = [carrinho.produto,carrinho.qtd,carrinho.valor,carrinho.livros_id]
    const [rows] = await conectado.query("INSERT INTO carrinho(produto,qtd,valor,livros_id) VALUES (?,?,?,?)",values)  
    console.log("Insert OK")
    return rows
}

async function deleteCarrinho(id){
    const conectado = await conecta();
    const values = [id]
    return await conectado.query("DELETE FROM carrinho WHERE idcarrinho=?",values)
}

//selectFilmes()
//selectLivros()
//selectSingle(10)
//insertLivro({titulo:"Wild Fury",resumo:"Lorem Lorem",valor:40.35,imagem:"wild-fury.jpg"})

module.exports = {selectFilmes,selectLivros,selectSingle,selectPromo,insertLivro,updatePromo,insertContato,
    insertUsuario,selectCarrinho,insertCarrinho,deleteCarrinho,selectUsers}