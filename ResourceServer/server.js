import { WebSocketServer } from "ws"; 
import { testDb } from "./game.js";
import { config } from "dotenv";
import app from "../app.js";
import debug from "debug";
import http from "http";
import { initiate_game, join_game, play_word, start_game } from "./game-manager.js";

config();

const DEBUG = debug("dev");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

process.on("uncaughtException", (error) => {
    DEBUG(`uncaught exception: ${error}`);
  });
  
process.on("unhandledRejection", (err) => {
    DEBUG(err);
    DEBUG("Unhandled Rejection:", {
        name: err.name,
        message: err.message || err,
    });
});

app.get('game/init')

app.get('/', (req, res) => {
    res.send('Home endpoint');
});

app.get('/2', (req, res) => {
    res.send('2nd endpoint.');
});
  
app.get('/3', (req, res) => {
    res.send('please fucking work');
});

app.get('/db', (req, res) => {
    //NOTE: this should be handled in middleware, just an example
    console.log('Hit the db endpoint')
    let db = testDb();
    db.then(x => {
        let results = x.map(row => {
            return {
                "id" : row.get("id"),
                "description" : row.get("description")
            }
        });
        res.send(`db test: ${results[0]['description']}`);
    })
});

const wss = new WebSocketServer({server: server})

const handle_message = (message, websocket) => {
  console.log('handling...')
  console.log(message)
  switch (message.action) {
    case 'init-game': 
      initiate_game(message.player_name, websocket)
      break;
    case 'join-game': 
      join_game(message.game_id, message.player_name, websocket)
      break;
    case 'start-game': 
      start_game(message.game_id, message.player_id, websocket)
      break;
    case 'play-word': 
      play_word(message.word, message.game_id, message.player_id, websocket)
      break;
    default: break;
  }
}

wss.on('connection', ws => {
  console.log('new connection created')
  ws.on('message', msg => handle_message(JSON.parse(msg), ws))
})

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});
