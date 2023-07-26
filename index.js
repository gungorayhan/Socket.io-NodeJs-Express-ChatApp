const express= require("express")
const cors= require("cors")
const http = require("http")
const {Server} = require("socket.io") 


const app=express()

app.use(cors())

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        method:['GET,POST']
    }

})

io.on('connection',(socket)=>{
    console.log(socket.id) //arayüzdeki sayfa her yenilendiğinde socket id yyeniden oluşturuluyor

    socket.on("room",(data)=>{
        // console.log(data)
        socket.join(data) //room olujşturuldu ve kaydedildi sockete dahil edildi
    })

    socket.on("message",(data)=>{ // arayüzden gelen message dinliyoruz ve datasını yakalıyoruz. yaklanana data yı tekrar belirlenen odaya göndereceğiz
       socket.to(data.room).emit("messageReturn",data)
       console.log(data)
    })
})


const PORT = 5000

server.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`) 
})