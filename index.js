const express = require("express");
const mongoose = require("mongoose");
const expHBs = require("express-handlebars");
const todoRoutes = require('./routes/todos');

const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
const handleBs = expHBs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', handleBs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

async function start(){
    try {
        await mongoose.connect('mongodb+srv://admin:12345@cluster0-uv15y.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        }) // connect DB
        app.listen(PORT, () => {
            console.log("Server hes been started...");
        });
    }
    catch (err) {
        console.log(err);
    }
}

start();