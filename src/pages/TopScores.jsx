import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { scoreApi, useGetScoresQuery } from '../services/scores';
import { Box, Stack, TablePagination, Typography } from '@mui/material';
import Error from './Error';
import { useWs } from '../hooks/useWs';
import { useDispatch } from 'react-redux';

function createData(rank, playerName, score) {
  return { rank, playerName, score };
}

export default function TopScores() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { data, error, isLoading } = useGetScoresQuery({count:100},{refetchOnMountOrArgChange: true})
    const [ready, val, send] = useWs('ws://localhost:5000')
    
    useEffect(() => {
        if (val?.name === 'topscores' && val?.message === 'update'){
            dispatch(scoreApi.util.resetApiState())
        }
    },[val, dispatch])

    const scores = data?.map((d, index) => {return createData(index+1, d.playerName, d.score)})
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    return (
        <>  
            {!error ? <>
            <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
                <Stack>
                <Typography variant="h5">All Time High Scores</Typography>
                <Typography align="center">Catcher</Typography>
                </Stack>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ width:"100%", tableLayout:"fixed" }} aria-label="Catcher Top Scores">
                <TableHead>
                    <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Player Name</TableCell>
                    <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                        key={row.rank}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.rank}
                        </TableCell>
                        <TableCell align="left" sx={{overflow:'hidden', textOverflow:"ellipsis"}}>{row.playerName}</TableCell>
                        <TableCell align="right">{row.score}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={scores?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> </>: <Error/>}
        </>
    );
}