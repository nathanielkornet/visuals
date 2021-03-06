var Express = require('express')
var app = new Express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(Express.static(__dirname + '/dist'))

io.on('connection', function (socket) {
  console.log('a user connected')

  // socket.emit('initial-state', initialState)

  socket.on('test', function (data) {
    console.log(data)
    socket.broadcast.emit('test', data)
  })

  socket.on('update channel', function (data) {
    socket.broadcast.emit('update channel', data)
  })

  socket.on('update mixer', function (data) {
    socket.broadcast.emit('update mixer', data)
  })

  socket.on('update camera', function (data) {
    socket.broadcast.emit('update camera', data)
  })
})

http.listen(8888, function () {
  console.log('Server running on port 8888')
})
