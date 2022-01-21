import React from 'react';
import { useSelector } from 'react-redux';
import rock from "../assets/images/rock.png"
import paper from "../assets/images/paper.png"
import scissors from "../assets/images/scissors.png"
import vs from "../assets/images/vs.png"
import Result from './Result';
import { useDispatch } from 'react-redux';
import { newGame } from '../actions';
import { useLocation } from 'react-router';
import socket from './Socket';

const Battle = (props) => {
    const dispatch = useDispatch();
    const obj = {
        "rock": rock,
        "paper": paper,
        "scissors": scissors
    }
    const location = useLocation()
    let currentLook = location.pathname.split("/")[2]
    const players = useSelector(state => state.battleReducer);

    const onClick = () => {
        if (currentLook === "singlePlayer") {
            dispatch(newGame())
        } else {
            socket.emit("newGame", { roomId: location.state.roomId })
        }
    }
    return (
        <div className="battle">
            <div className="images">
                <div id={currentLook === "singlePlayer" ? players.myChoice : props.playerOne}>
                    {currentLook === "singlePlayer" ? <img src={obj[players.myChoice]} alt="my choice"></img> : <img src={obj[props.playerOne]} alt="computer choice"></img>}
                    {currentLook === "singlePlayer" ? <p>You</p> : <p>{props.roomInfo.playerOne}</p>}

                </div>
                <div className="vs">
                    <img src={vs} alt="vs"></img>
                    <button onClick={() => onClick()}>Play again</button>
                </div>
                <div id={currentLook === "singlePlayer" ? players.computerChoice : props.playerTwo}>
                    {currentLook === "singlePlayer" ? <img src={obj[players.computerChoice]} alt="computer choice"></img> : <img src={obj[props.playerTwo]} alt="computer choice"></img>}
                    {currentLook === "singlePlayer" ? <p>Computer</p> : <p>{props.roomInfo.playerTwo}</p>}
                </div>
            </div>
            {
                currentLook === "singlePlayer" ? <Result />
                    : <Result playerOne={props.playerOne} playerTwo={props.playerTwo} playerOneName={props.roomInfo.playerOne} playerTwoName={props.roomInfo.playerTwo} />
            }

        </div >
    );
};

export default Battle;