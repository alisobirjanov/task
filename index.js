const express = require('express')
const config  = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use('/api', require('./routes/message.routes'))
app.use('/api', require('./routes/admin.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
          useFindAndModify: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true
        });

        console.log(`MongoDB Connected:${mongoose.connection.host}`);

        app.listen(PORT, () => {
          console.log(`Server has been started on port ${PORT}...`);
        });  

    } catch(e) {
        console.log(e)
        process.exit(1)
    }
}


start()
