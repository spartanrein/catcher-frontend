import React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import './App.css'
import {  useDispatch } from 'react-redux';
import { resetScore, startGame } from './features/gameSlice';
import { useNavigate } from 'react-router-dom'
import e1 from './assets/e1.png'
import e2 from './assets/e2.png'
import p1 from './assets/p1.png'
import p2 from './assets/p2.png'
import p3 from './assets/p3.png'
import p4 from './assets/p4.png'

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
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Box>
            <img src={p1} width={"64px"} alt="p1"/>
            <img src={p2} width={"64px"} alt="p2"/>
            <img src={p3} width={"64px"} alt="p3"/>
            <img src={p4} width={"64px"} alt="p4"/>
          </Box>
          <Box>
            <Typography variant='h6'> = 50 points</Typography>
          </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Box>
            <img src={e1} width={"64px"} alt="e1"/>
            <img src={e2} width={"64px"} alt="p2"/>
          </Box>
          <Box>
            <Typography variant='h6'> = -100 points</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default App;
