import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, TextField, Container, Button } from '@mui/material'
import { resetScore, startGame, setPlayerName } from '../features/gameSlice';
import { usePostAddScoreMutation } from '../services/scores';
import { useNavigate } from 'react-router-dom'

export const GameOver = () => {
    const [addTotalScore] = usePostAddScoreMutation()
    const playerName = useSelector((state) => state.player.playerName)
    const score = useSelector((state) => state.player.score)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleSubmitScore(){
        addTotalScore({score:score, playerName: playerName})
        dispatch(resetScore())
        dispatch(startGame())
        navigate('/leaderboard')
    }

    return (
        <Container>
            <Box sx={{display:'flex', width:'100%', height:"100vh", justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <Typography variant="h2">Game Over!</Typography>
                <TextField
                    value={playerName}
                    label={"Enter Player Name"}
                    onChange={(e) => dispatch(setPlayerName(e.target.value))}
                />
                <Button
                    disabled={!playerName}
                    onClick={handleSubmitScore}
                >submit top score
                </Button>
            </Box>
        </Container>
    )
}

export default GameOver