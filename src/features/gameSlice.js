import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    playerName: "",
    score: 0,
    isStartGame: true
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        resetScore(state){
            state.score = 0
        },
        addScore(state, action){
            if (state.isStartGame){
                state.score += action.payload
            }
        },
        setPlayerName(state, action){
            state.playerName = action.payload
        },
        startGame(state){
            state.isStartGame = true
        },
        stopGame(state){
            state.isStartGame = false
        }
    }
})

export const { resetScore, addScore, setPlayerName, startGame, stopGame } = gameSlice.actions
export default gameSlice.reducer