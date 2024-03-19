import React, {useEffect } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { resetScore, startGame } from './features/gameSlice';
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Container sx={{height:'100vh'}}>
      <Box sx={{display:'flex', flexDirection:'column', height:'80%', alignContent:'center', justifyContent:'center'}}>
        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
          <Typography variant="h2">Pirate Game</Typography>
        </Box>
        <Button 
          fullWidth 
          variant="contained" 
          onClick={            
            () => {
              dispatch(resetScore())
              dispatch(startGame())
              navigate('/game')
            }
          }
        >Start Game
        </Button>
        <Button fullWidth onClick={() => navigate('/leaderboard')}>See Leaderboard</Button>
      </Box>
    </Container>
  )
}

export default App;
