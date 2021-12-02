const express = require('express')
const mongoose = require('mongoose')
const teamsRouter = require('./routes/teams.routes')
const seasonsRouter = require('./routes/seasons.routes')
const tournamentRouter = require('./routes/tournaments.routes')
const matchesRouter = require('./routes/matches.routes')

const PORT = process.env.PORT || 5000;

const DB_URL = 'mongodb+srv://sash111k:mongo-test-iba@cluster0.7au7t.mongodb.net/mongo-test-iba?retryWrites=true&w=majority'

const app = express();

app.use(express.json())

app.use('/api',teamsRouter);
app.use('/api', seasonsRouter);
app.use('/api', tournamentRouter);
app.use('/api', matchesRouter);


async function startApp() {
    try {
        app.listen(PORT,()=>{
            console.log(`server listening on PORT ${PORT}`)
        })
        await mongoose.connect(DB_URL ,()=>{
            console.log('Database connected')
        })

    }
    catch (e) {
        console.log('Error: ' + e)
    }
}

startApp();
