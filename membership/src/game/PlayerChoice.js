import React, { useEffect, useState } from 'react';
import rock from "../assets/images/rock.png"
import paper from "../assets/images/paper.png"
import scissors from "../assets/images/scissors.png"
import { useDispatch } from 'react-redux';
import { computerChoice, myChoice } from '../actions';
import { useLocation } from 'react-router';
import authHelper from '../auth/auth-helper';
import socket from './Socket';
const PlayerChoice = (props) => {
    const location = useLocation()
    const dispatch = useDispatch();
    const choiceArray = ["rock", "paper", "scissors"];
    let currentLook = location.pathname.split("/")[2]
    const pickMyChoice = (choice) => {
        if (currentLook === "singlePlayer") {
            dispatch(myChoice(choice))
            let randomNumber = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            dispatch(computerChoice(choiceArray[randomNumber]))
        } else {
            socket.emit("playerPick", { roomId: location.state.roomId, player: authHelper.isAuthenticated().user.name, choice: choice })
        }
    }


    useEffect(() => {
        socket.on('playerPicked', data => {
            props.getPlayersChoice(data)
        })
    }, [socket])

    return (
        <div className="playerChoiceWrapper">
            <div className="images">
                <div id="rock" onClick={() => pickMyChoice("rock")}>
                    <img src={rock} alt="rock"></img>
                    <p>Rock</p>
                </div>
                <div id="paper" onClick={() => pickMyChoice("paper")}>
                    <img src={paper} alt="paper"></img>
                    <p>Paper</p>
                </div>
                <div id="scissors" onClick={() => pickMyChoice("scissors")}>
                    <img src={scissors} alt="scissors"></img>
                    <p>Scissors</p>
                </div>
            </div>
            <h2>Pick one!</h2>
        </div>

    );
};

export default PlayerChoice;