var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let players = {}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', socket => {
    socket.emit('players', players)
    socket.on('player-changed', data => {
        players[socket.id] = data
        socket.broadcast.emit('player-changed', [socket.id, data])
    })
    
    socket.on('disconnect', () => {
        delete players[socket.id]
        socket.emit('players', players)
    })
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});
