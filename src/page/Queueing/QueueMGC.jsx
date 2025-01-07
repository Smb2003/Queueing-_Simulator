import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { filledInputClasses } from '@mui/material/FilledInput';
import { InputAdornment, inputBaseClasses, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';

const factorial = (n) => {
  if(n === 0){
      return 1;
  }
  if (n > 0) {
        return n * factorial(n - 1);
    }
}
function calculatePo(c, rho){
    let res = 0
    for(let n = 0; n<c; n++){
      res += Math.pow((c*rho), n)/factorial(n)
    }
    return 1 / (res + (Math.pow((c*rho), c)/(factorial(c)*(1-rho))))
}
const calculateCsSquare = (variance,mue) => {
  return (variance / Math.pow((1 / mue ),2));
}
const calculateMGC = (meanArrivalTime, minServiceTime,maxServiceTime,servers) => {
  meanArrivalTime = parseFloat(1 / meanArrivalTime);
  let meanServiceTime = 1/ ((+minServiceTime + +maxServiceTime)/2);
  servers = parseInt(servers)
  
  const rho = +(meanArrivalTime / (servers * meanServiceTime)).toFixed(1);
  if(rho < 1){
      
  const idle = +(1 - rho).toFixed(1);
  const variance = Math.pow((maxServiceTime - minServiceTime),2)/12;
  const cs2 = calculateCsSquare(variance,meanServiceTime);
   const Lq = +(((calculatePo(servers, rho)*Math.pow((meanArrivalTime/meanServiceTime),servers)*rho)/(factorial(servers)*Math.pow(1-rho, 2))) * ((cs2 + 1) / 2)).toFixed(1);
    const Wq = +(Lq / meanArrivalTime).toFixed(2);
    const Ws = +(Wq + (1/meanServiceTime)).toFixed(2);
    const Ls = +((meanArrivalTime*Ws)).toFixed(2);
    return {
        rho,
        idle,
        Wq,
        Lq,
        Ws,
        Ls
    }
  }else{
      console.log("This is not queuing model..");
      return {rho};
  }
}
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#065F46",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: "#065F46",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const QueueMGC = () => {
    const [formdata,setFormData] = useState({});
    const [data,setData] = useState({});
    
    const handleSubmit = (field,val) => {
        setFormData({...formdata,
            [field]:val
        })
    }

    
    const Submit = (e) => {
        e.preventDefault();
        const {ArrivalTime,MinServiceTime,MaxServiceTime,Servers} = formdata;
        const model = calculateMGC(ArrivalTime,MinServiceTime,MaxServiceTime,Servers);
        console.log("model",model)
        setData({
          ...model
        })
        console.log(data);
      }
  return (
    <div className='  w-full h-screen'>
        <div className='flex flex-col md:flex-row justify-center items-center md:justify-around'>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="w-full md:flex md:py-5 md:px-6"
            >
                <TextField
                    // id="filled-suffix-shrink"
                    label="Arrival Time"
                    variant="filled"
                    onChange={(e)=>handleSubmit("ArrivalTime",e.target.value)}
                    sx={{
                      marginX: {md:"1vw" ,xs: '4vw'},
                      width:{xs:"90%",md:'19%'},
                      marginY: {md:"1vw" ,xs: '4vw'},
                    }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment
                            position="start"
                            sx={{
                              display: "flex",
                              alignItems: "start",
                              justifyContent: "end",
                              opacity: 0,
                              pointerEvents: "none",
                              width: "fit-content",
                              [`.${filledInputClasses.root} &`]: {
                                margin: 0,
                              },
                              [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                opacity: 1,
                              },
                            }}
                        >
                            minute
                        </InputAdornment>
                        ),
                    },
                    }}
                />
                <TextField
                    label="Min Service Time"
                    sx={{
                      marginX: {md:"1vw" ,xs: '4vw'},
                      width:{xs:"90%",md:'19%'},
                      marginY: {md:"1vw" ,xs: '4vw'},
                    }}
                    variant="filled"
                    onChange={(e)=>handleSubmit("MinServiceTime",e.target.value)}
                    slotProps={{
                    input: {
                        endAdornment: (
                        <InputAdornment
                        position="start"
                        sx={{
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "end",
                          opacity: 0,
                          pointerEvents: "none",
                          width: "fit-content",
                          [`.${filledInputClasses.root} &`]: {
                            margin: 0,
                            // width:"1vw",

                          },
                          [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                            opacity: 1,
                            // width:"1vw",
                          },
                        }}
                        >
                            minute
                        </InputAdornment>
                        ),
                    },
                    }}
                />
                <TextField
                    // id="filled-suffix-shrink"
                    label="Max Service Time"
                    sx={{
                      marginX: {md:"1vw" ,xs: '4vw'},
                      width:{xs:"90%",md:'19%'},
                      marginY: {md:"1vw" ,xs: '4vw'},
                    }}
                    variant="filled"
                    onChange={(e)=>handleSubmit("MaxServiceTime",e.target.value)}
                    slotProps={{
                    input: {
                        endAdornment: (
                        <InputAdornment
                            position="start"
                            sx={{
                              display: "flex",
                              alignItems: "start",
                              justifyContent: "end",
                              opacity: 0,
                              pointerEvents: "none",
                              width: "fit-content",
                              [`.${filledInputClasses.root} &`]: {
                                margin: 0,
                                // width:"1vw",
    
                              },
                              [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                opacity: 1,
                                // width:"1vw",
                              },
                            }}
                        >
                            minute
                        </InputAdornment>
                        ),
                    },
                    }}
                />
                <TextField
                  id="filled-suffix-shrink"
                  label="Number of Server"
                  variant="filled"
                  sx={{
                    marginX: {md:"1vw" ,xs: '4vw'},
                    width:{xs:"90%",md:'19%'},
                    marginY: {md:"1vw" ,xs: '4vw'},
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "end",
                          opacity: 0,
                          pointerEvents: "none",
                          width: "fit-content",
                          [`.${filledInputClasses.root} &`]: {
                            margin: 0,
                            // width:"1vw",

                          },
                          [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                            opacity: 1,
                            // width:"1vw",
                          },
                        }}
                      >
                        Number
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSubmit("Servers", e.target.value)}
                />
                <button className='md:w-[10vw] w-[92%] md:h-[4.4vw] py-4 px-2 md:ml-7 mx-[2vw] my-[1vw] rounded-md bg-emerald-800 text-white active:scale-95 hover:bg-emerald-600 text-md' onClick={Submit}>Calculate</button>
            </Box>
        </div>
        <Box className="px-3 py-[10vw]">  
        {
          (Object.keys(data).length === 0)? 
          null
          :
          (Object.keys(data).length === 1) ?
           <div className='flex items-center justify-center'>
            <div className='border-1 border p-2 rounded-lg border-emerald-200'>
            <h1 className='text-center font-mono font-bold text-xl text-emerald-950'>{`Rho (${data.rho}) is greater than 1. It's not a model.`}</h1>

            </div>
           </div>
          :
            <>
              <TableContainer component={Paper} sx={{
                maxWidth: '1200px', margin: 'auto'
              }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Utilization</StyledTableCell>
                    <StyledTableCell align='center'>Wait Time In Queue(Wq)</StyledTableCell>
                    <StyledTableCell align='center'>Wait Time In System(Ws)</StyledTableCell>
                    <StyledTableCell align='center'>Length In Queue(Lq)</StyledTableCell> 
                    <StyledTableCell align='center'>Length In System(Ls)</StyledTableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?
                    <StyledTableRow className='px-15'>
                      <StyledTableCell className='mx-15' align='center'>{data.rho}</StyledTableCell>
                      <StyledTableCell className='mx-15' align='center'>{data.Wq}</StyledTableCell>
                      <StyledTableCell className='mx-5' align='center'>{data.Ws}</StyledTableCell>
                      <StyledTableCell className='mx-5' align='center'>{data.Lq}</StyledTableCell>
                      <StyledTableCell className='mx-5' align='center'>{data.Ls}</StyledTableCell>
                    </StyledTableRow>
                  :
                    <h1>This is not a queuing models.</h1>
                  }
                </TableBody>
              </Table>
              </TableContainer>
            </>
        }
      </Box>
    </div>
  )
}

export default QueueMGC