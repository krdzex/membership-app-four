const BattleReducer = (state = { myChoice: "", computerChoice: "" }, action) => {
    switch (action.type) {
        case "MY_CHOICE":
            return state = { ...state, myChoice: action.payload }
        case "COMPUTER_CHOICE":
            return state = { ...state, computerChoice: action.payload }
        case "NEW_GAME":
            return state = { myChoice: "", computerChoice: "" }
        default:
            return state;
    }
}

export default BattleReducer;