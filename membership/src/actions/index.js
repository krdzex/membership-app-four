export const openPopUp = () => {
    return {
        type: "OPEN"
    }
}

export const closePopUp = () => {
    return {
        type: "CLOSE"
    }
}

export const myChoice = (choice) => {
    return {
        type: "MY_CHOICE",
        payload: choice,
    }
}

export const computerChoice = (choice) => {
    return {
        type: "COMPUTER_CHOICE",
        payload: choice,
    }
}
export const newGame = () => {
    return {
        type: "NEW_GAME"
    }
}

export const lose = () => {
    return {
        type: "LOSE"
    }
}


export const win = () => {
    return {
        type: "WIN"
    }
}

export const loadResult = (result) => {
    return {
        type: "LOAD_RESULT",
        payload: result
    }
}