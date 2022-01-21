import { combineReducers } from "redux";
import PopUpReducer from "./PopUpReducer";
import BattleReducer from "./BattleReducer";
import WinsReducer from "./WinsReducer";
const allReducers = combineReducers({
    popUpReducer: PopUpReducer,
    battleReducer: BattleReducer,
    winsReducer: WinsReducer
})

export default allReducers;