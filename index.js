const express = require('express')
const app = express()
const port = 8080 //porta

app.use(express.static('livraria-2022'))
app.use("/books",express.static("books"))
app.use("/carrinho.html",express.static('carrinho.html'))
app.use("/cadastro.html",express.static('cadastro.html'))

app.use("/imgs",express.static("imgs"))
app.use("/css",express.static("css"))

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index-estatico.html`)
})
app.get("/carrinho",(req,res)=>{
    res.sendFile(`${__dirname}/carrinho.html`)
})
app.get("/cadastro",(req,res)=>{
    res.sendFile(`${__dirname}/cadastro.html`)
})


app.listen(port, ()=> console.log("Servidor rodando com nodemon!"))