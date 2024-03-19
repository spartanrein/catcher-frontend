import { React, useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

export const useWs = ({ url }) => {
    const [isReady, setIsReady] = useState(false)
    const [val, setVal] = useState(null)
  
    const ws = useRef(null)
  
    useEffect(() => {
        const socket = io('ws://localhost:5000')
        socket.on('connect', () => {
            console.log(`${socket.id} connected`)
        })

        socket.on('message', (arg) => {
            console.log(`socket message received: ${arg}`)
            setVal(arg)
        })

        socket.on("connect_error", () => {
            setTimeout(() => {
              socket.connect();
            }, 1000);
        });

        ws.current = socket

        return () => {
        socket.disconnect()
        }
    }, [url])
  
    // bind is needed to make sure `send` references correct `this`
    return [isReady, val, ws.current?.send.bind(ws.current)]
}