const app = require('./config/server')

const server = app.listen(3333, () => console.log('Subiu!'))

const io = require('socket.io').listen(server)

app.set('io', io)

/** criar conexao por websocket */

io.on('connection', (socket) => {
    console.log('Usuario conectou')

    socket.on('disconnect', () => console.log('Usuário desconectou'))

    socket.on('msgServer', function(data){
        socket.emit('msg',{
            apelido : data.apelido,
            mensagem : data.mensagem
        })

        socket.broadcast.emit('msg',{
            apelido : data.apelido,
            mensagem : data.mensagem
        })

        if(parseInt(data.apelidoAtt) == 0){
            socket.emit('participante',{
                apelido : data.apelido
            })
    
            socket.broadcast.emit('participante',{
                apelido : data.apelido
            })
        }
        
    })
})