
const WinsReducer = (state = 0, action) => {
    switch (action.type) {
        case "WIN":
            return state + 1;
        case "LOSE":
            return state - 1;
        case "LOAD_RESULT":
            return state = action.payload;
        default:
            return state;
    }
}

export default WinsReducer;