import React from 'react';
import { useDispatch } from 'react-redux';
import { closePopUp } from '../actions';

const Rules = () => {
    const dispatch = useDispatch();
    const closeOnClick = () => {
        dispatch(closePopUp())
    }
    return (
        <div className="rules">
            <div className="innerDiv">
                <div className="rulesHeader">
                    <h2>Rules</h2>
                    <button onClick={closeOnClick}>X</button>
                </div>
                <div className="text">
                    <p>Rock breaks scissors and therefore rock wins over scissors. Rock loses against paper.Scissors cut paper therefore scissors win over paper. Scissors lose against rock. Paper covers rock therefore paper wins over rock. Paper loses against scissors. If the player and computer make the same selection,there is a tie. Good luck :)</p>
                </div>
            </div>

        </div>
    );
};

export default Rules;