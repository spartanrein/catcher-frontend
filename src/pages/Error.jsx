import { Box, Typography } from '@mui/material'
import React from 'react'

export const Error = () => {
    return (
        <Box sx={{display:'flex', height:"100vh", width:"100%", alignItems:'center', justifyContent:'center'}}>
            <Typography variant='h5'>Oops! There seems to be a problem.  Please try again later</Typography>
        </Box>
    )    
}

export default Error