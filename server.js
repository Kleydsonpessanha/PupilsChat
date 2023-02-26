const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use("/css", express.static("css", {}))
app.use("/js", express.static("js", {}))
app.use(express.static(__dirname + '/app'));




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/app.html');
});



io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
