import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { lose, win } from '../actions';
import socket from './Socket';
const Result = ({ playerOne, playerTwo, playerTwoName, playerOneName }) => {
    const dispatch = useDispatch()
    const players = useSelector(state => state.battleReducer);
    const [resultOfMatch, setResultOfMatch] = useState("")
    const [reason, setReason] = useState("")
    const location = useLocation()
    let currentLook = location.pathname.split("/")[2]




    useEffect(() => {
        if (currentLook === "singlePlayer") {
            if (players.myChoice === players.computerChoice) {
                setResultOfMatch("No winner!")
                setReason("Match is tied.")
                return
            }
            if (players.myChoice === "rock" && players.computerChoice === "scissors") {
                setResultOfMatch(`You WON`)
                setReason(`${players.myChoice} beat ${players.computerChoice}`)
                dispatch(win())

                return
            }
            if (players.myChoice === "paper" && players.computerChoice === "rock") {
                setResultOfMatch(`You WON`)
                setReason(`${players.myChoice} beat ${players.computerChoice}`)
                dispatch(win())
                return
            }
            if (players.myChoice === "scissors" && players.computerChoice === "paper") {
                setResultOfMatch(`You WON`)
                setReason(`${players.myChoice} beat ${players.computerChoice}`)
                dispatch(win())
                return
            }
            dispatch(lose())
            setResultOfMatch(`Computer WON`)
            setReason(`${players.computerChoice} beat ${players.myChoice}`)
        } else {
            if (playerOne !== "" && playerTwo !== "") {
                if (playerOne === playerTwo) {
                    setResultOfMatch("No winner!")
                    setReason("Match is tied.")
                    return
                }
                if (playerOne === "rock" && playerTwo === "scissors") {
                    setResultOfMatch(`${playerOneName} WON`)
                    socket.emit("playerOneWon", { roomId: location.state.roomId })
                    setReason(`${playerOne} beat ${playerTwo}`)

                    return
                }
                if (playerOne === "paper" && playerTwo === "rock") {
                    setResultOfMatch(`${playerOneName} WON`)
                    socket.emit("playerOneWon", { roomId: location.state.roomId })
                    setReason(`${playerOne} beat ${playerTwo}`)

                    return
                }
                if (playerOne === "scissors" && playerTwo === "paper") {
                    setResultOfMatch(`${playerOneName} WON`, { roomId: location.state.roomId })
                    socket.emit("playerOneWon")
                    setReason(`${playerOne} beat ${playerTwo}`)
                    return
                }
                socket.emit("playerTwoWon", { roomId: location.state.roomId })
                setResultOfMatch(`${playerTwoName} WON`, { roomId: location.state.roomId })
                setReason(`${playerOne} beat ${playerTwo}`)
            }
        }

    }, [players.computerChoice, playerOne, playerTwo])

    return (
        <div className="result">
            <p>{resultOfMatch}</p>
            <p>{reason}</p>
        </div>
    );
};

export default Result;