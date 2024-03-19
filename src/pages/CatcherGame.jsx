import { React, useRef, useEffect, useState } from 'react'
import boat from '../assets/boat.png'
import e1 from '../assets/e1.png'
import e2 from '../assets/e2.png'
import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png'
import p3 from '../assets/p3.png'
import p4 from '../assets/p4.png'
import background from '../assets/bg1.png'
import { objectProps } from '../data/data'
import BaseObject from '../objects/BaseObject'
import { collision, getMousePos, renderObject, resetPosition, spawnFallingItem } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { stopGame, addScore, } from '../features/gameSlice';
import GameOver from './GameOver'
import '../App.css'

export const CatcherGame = () => {
    let { boatProps, e1Props, e2Props, p1Props, p2Props, p3Props, p4Props } = objectProps;
    let canvasRef = useRef(null)
    const [counter, setCounter] = useState(60)
    const score = useSelector((state) => state.player.score)
    const isStartGame = useSelector((state) => state.player.isStartGame)
    const dispatch = useDispatch()
    
    //Stop game after 60 seconds
    useEffect(() => {
        const timer = isStartGame && counter > 0 && setTimeout(() => setCounter(counter -1), 1000);
        if (counter === 0){
          dispatch(stopGame())
        }
        return () => clearInterval(timer)
    },[counter, isStartGame, dispatch])
    
    //Draw game on canvas
    useEffect(() => {
        const timerIdHolder = {timerId: null}
        let canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        let { backgroundImg, boatImg, enemy1Img,enemy2Img,point1Img,point2Img, point3Img, point4Img } = loadImages(ctx, canvas)
        const fallingObjects = [
            {img: enemy1Img, data: e1Props},
            {img: enemy2Img, data: e2Props},
            {img: point1Img, data: p1Props},
            {img: point2Img, data: p2Props},
            {img: point3Img, data: p3Props},
            {img: point4Img, data: p4Props},
        ]
        const render = () => {
            let playerBoat = new BaseObject(ctx, canvas, boatImg, boatProps.x, boatProps.y, boatProps.width)
            canvas.width = window.innerWidth > 1920 ? 1920 : window.innerWidth
            canvas.height = window.innerWidth > 1920 ? 1080 : window.innerWidth /1.778
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(backgroundImg,0,0, canvas.width, canvas.height)
            boatProps.y = canvas.getBoundingClientRect().height - canvas.getBoundingClientRect().height/4
            boatProps.width = canvas.width/12
            renderObject(ctx, canvas, boatImg, playerBoat,  boatProps)
            for (let i = 0; i < fallingObjects.length; i++){
                spawnFallingItem(ctx, canvas, fallingObjects[i].data, fallingObjects[i].img)
                if (collision(boatProps, canvas.width/12, fallingObjects[i].data, canvas.width/14, 10)){
                    console.log('Collision Detected')
                    dispatch(addScore(fallingObjects[i].data.score))
                    resetPosition(fallingObjects[i].data, canvas)
                }
            }
            ctx.font = canvas.width < 1920 ? `${25}px arial-serif` : `${50}px arial-serif`
            ctx.textAlign = "center"
            ctx.fillText(counter, canvas.width/2, 50)
            ctx.fillText(`Score: ${score}`, canvas.width/8, 50)
            timerIdHolder.timerId = window.requestAnimationFrame(render)
        }
        render()
        return () => {
            cancelAnimationFrame(timerIdHolder.timerId)
        }
    },[boatProps, dispatch, e1Props, e2Props, p1Props, p2Props, p3Props, p4Props, counter, score])

    function loadImages(ctx, canvas){
        let backgroundImg = new Image()
        let boatImg = new Image()
        let enemy1Img = new Image()
        let enemy2Img = new Image()
        let point1Img = new Image()
        let point2Img = new Image()
        let point3Img = new Image()
        let point4Img = new Image()
        backgroundImg.src = background
        backgroundImg.onload = () => {
            ctx.drawImage(backgroundImg,0,0, canvas.width, canvas.height)
        }
        boatImg.src = boat;
        enemy1Img.src = e1;
        enemy2Img.src = e2;
        point1Img.src = p1;
        point2Img.src = p2;
        point3Img.src = p3;
        point4Img.src = p4;

        return {backgroundImg, boatImg, enemy1Img,enemy2Img,point1Img,point2Img, point3Img, point4Img}
    }

    return (
        <>
            {isStartGame ? <>
                {/* <Box sx={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center', paddingTop:'12px'}}>
                    <Box>
                        <Typography variant={'h5'}>{`Score: ${score}`}</Typography>
                    </Box>
                    <Box>
                        <Typography variant={'h5'}>{`Timer: ${counter}`}</Typography>
                    </Box>
                </Box> */}
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <canvas
                        ref={canvasRef} 
                        id="canvas"
                        onMouseMove={ (evt) => boatProps.x = getMousePos(canvasRef.current, evt).x -50 }
                    />
                </Box>
                
            </> :
                <GameOver/>
            }  
        </>
    )
}

export default CatcherGame