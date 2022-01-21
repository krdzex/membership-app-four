import React, { useEffect, useState } from 'react';
import GameHeader from './GameHeader';
import PlayerChoice from './PlayerChoice';
import { useSelector } from 'react-redux';
import Battle from './Battle';
import { useLocation } from 'react-router';
import socket from './Socket';

const Game = () => {
    const location = useLocation()
    const [playerOne, setPlayerOne] = useState("")
    const [playerTwo, setPlayerTwo] = useState("")
    const [roomInfo, setRoomInfo] = useState({})
    const computerChoice = useSelector(state => state.battleReducer)
    let currentLook = location.pathname.split("/")[2]

    const getPlayersChoice = (player) => {
        if (player.playerOneChoice !== undefined) {
            setPlayerOne(player.playerOneChoice)
        }
        if (player.playerTwoChoice !== undefined) {
            setPlayerTwo(player.playerTwoChoice)
        }
    }

    useEffect(() => {
        if (currentLook !== "singlePlayer") {
            socket.emit("startGame", { roomId: location.state.roomId })
        }

    }, [])

    useEffect(() => {
        socket.on('playersInfo', data => {
            setRoomInfo(data)
        })

        socket.on('playerScored', data => {
            setRoomInfo(data)
        })

        socket.on('newGameStarted', data => {
            setPlayerOne(data.playerOneChoice)
            setPlayerTwo(data.playerTwoChoice)
        })
    }, [socket])



    return (
        <div>
            {currentLook === "singlePlayer" ? <div className="gameWrapper">
                <GameHeader />
                {computerChoice.computerChoice === "" ? <PlayerChoice getPlayersChoice={getPlayersChoice} /> : <Battle />}
            </div> :
                <div className="gameWrapper">
                    <GameHeader roomInfo={roomInfo} />
                    {playerOne !== "" && playerTwo !== "" ? <Battle playerOne={playerOne} playerTwo={playerTwo} roomInfo={roomInfo} /> : <PlayerChoice getPlayersChoice={getPlayersChoice} />}
                </div>}
        </div>

    );
};

export default Game;
