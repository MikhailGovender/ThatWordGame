// This file needs to create the socket connection, then adjust the DOM to display the right stuff.

//Example on how to handle the socket below.

import { show_join, show_lobby } from "./display-handler.js";
import { ClientPlayer } from "./player-state-machine.js"

let client = null

const wsURL = window.location.host.includes("localhost") ? `ws://${window.location.host}:5000/` : `wss://${window.location.host}/`;
const socket = new WebSocket(wsURL);

async function fetchName() {
    let response = await fetch("/auth/user");
    let data = await response.json();
    sessionStorage.setItem("username", data.user.name);
    return data.user.name;
}


socket.onopen = () => {
    // check if url containers the parameter create or join
    let urlParams = new URLSearchParams(window.location.search);
    let create = urlParams.get('create');
    let join = urlParams.get('join');
    if (create != null && join == null) {
        createGame();
    } else if (create == null && join != null) {
        joinGame();
    } else if (create == null && join == null) {
        window.location = "/home";
    }
};

async function createPlayer() {
    let name = await fetchName();
    return new ClientPlayer(name, socket);
}

async function createGame() {
    console.log('create game')
    let client = await createPlayer();
    client.create_game()
}

async function joinGame() {
    console.log('join game')
    let client = await createPlayer();
    show_lobby(client);
}
