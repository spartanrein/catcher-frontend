import { configureStore } from '@reduxjs/toolkit'
import { scoreApi } from '../services/scores'
import { setupListeners } from '@reduxjs/toolkit/query'
import gameReducer from '../features/gameSlice'
export const store = configureStore({
    reducer: {
        player: gameReducer,
        [scoreApi.reducerPath]: scoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(scoreApi.middleware)
})

setupListeners(store.dispatch)