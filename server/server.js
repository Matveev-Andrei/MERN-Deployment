const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const socket = require('socket.io')

app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(cors());

//Setup MongoDB

require('./config/mongoose.config')

//Setup routes

require('./routes/pets.routes')(app);

const server = app.listen(port, () => console.log("listening on port : " + port ));

const io = socket(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: [ 'GET', 'POST' ],
        allowedHeaders: ['*'],
    }
});

io.on("connection", (socket) => {
    console.log( 'Server socket id --> ' + socket.id );

    socket.on("pet_was_added", (data) => {
        console.log("pet was added");
        console.log(data);
        socket.broadcast.emit("added_pet", data);
    })
    socket.on("pet_was_adopted", (data) => {
        socket.emit("adopted_pet", data);
    })
})