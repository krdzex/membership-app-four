import './App.css';
import Game from './Game';
import Rules from './Rules';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { loadResult } from '../actions';
import { useHistory, useLocation } from 'react-router';
import socket from './Socket';

function MainScreen() {
    const history = useHistory();
    const location = useLocation()
    const dispatch = useDispatch()
    const openPopUp = useSelector(state => state.popUpReducer)
    const result = useSelector(state => state.winsReducer);
    window.onbeforeunload = function () {
        localStorage.setItem("result", result);
        history.push("/game");
        socket.emit("deleteRoom", { roomId: location.state.roomId })
    }


    window.onload = function () {
        const data = localStorage.getItem("result");
        if (data) {
            dispatch(loadResult(parseInt(data)))
        }
    }

    return (
        <div className="App">
            <Game />
            {openPopUp && (<Rules />)}
        </div>
    );
}

export default MainScreen;
