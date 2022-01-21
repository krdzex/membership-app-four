import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openPopUp } from '../actions';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const GameHeader = ({roomInfo}) => {
    const dispatch = useDispatch();
    const onClickPopUp = () => {
        dispatch(openPopUp());
    }
    const [playerOneScore, setPlayerOneScore] = useState(0)
    const [playerTwoScore, setPlayerTwoScore] = useState(0)
    const result = useSelector(state => state.winsReducer);
    let location = useLocation()
    let currentLook = location.pathname.split("/")[2]
    
    return (
        <div>
            {currentLook === "singlePlayer" ? <div className="gameHeader">
                SCORE: {result}
                <button onClick={onClickPopUp}>Rules</button>
            </div> :
                < div className="gameHeader">
                    {roomInfo.playerOne}: {roomInfo.playerOneScore}<br />
                    {roomInfo.playerTwo}: {roomInfo.playerTwoScore}
                    <button onClick={onClickPopUp}>Rules</button>
                </div>
            }
        </div >

    );
};

export default GameHeader;