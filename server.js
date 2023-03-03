const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use("/css", express.static("css", {}))
app.use("/js", express.static("js", {}))
app.use(express.static(__dirname + '/app'));


let users = {}
  

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/app.html');
});



io.on('connection', (socket) => {
  console.log(`[${socket.id}]: Entrou`);

  socket.on('NEW USER', (user) => {
      users[socket.id] = user;
      io.emit('user joined', {users: users})
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', { message: data.message, user: data.user, users: users });
  });

  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('user left', {users: users})
    console.log('user disconnected')
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
