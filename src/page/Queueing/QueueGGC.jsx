import React, { useState } from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { filledInputClasses } from '@mui/material/FilledInput';
import { InputAdornment, inputBaseClasses, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
function factorial(n) { 
  if (n === 0) {
      return 1;
  }
  if (n > 0) {
      return n * factorial(n - 1);
  }
}
const calculateCaSquare = (arrivalVar,lambda) => {
  return +(Math.round(arrivalVar / Math.pow((1/lambda),2)).toFixed(2));
}
const calculateCsSquare = (serviceVar,mue) => {
  return +((serviceVar / Math.pow((1/mue),2)).toFixed(2));
}
function calculatePo(c, rho){
  let res = 0
  for(let n = 0; n<c; n++){
    res += Math.pow((c*rho), n)/factorial(n)
  }
  return 1 / (res + (Math.pow((c*rho), c)/(factorial(c)*(1-rho))))
}

function calculateGGC(meanArrival, meanService,ArrivalVariance,ServiceVariance, servers) {
  meanArrival = 1/ +meanArrival
  meanService = 1/ +meanService
  const ca = +ArrivalVariance/(Math.pow(1/meanArrival, 2))
  const cs = +ServiceVariance/(Math.pow(1/meanService, 2))
  const rho = (meanArrival / (servers * meanService));
  const idle = +(1 - rho).toFixed(2); 
  if(rho < 1){
  const expaverageQueueLengthQueue = (calculatePo(servers, rho)*Math.pow((meanArrival/meanService),servers)*rho)/(factorial(servers)*Math.pow(1-rho, 2));

  const Lq = +(expaverageQueueLengthQueue*((ca+cs)/2)).toFixed(2);
  const Wq = +(Lq / meanArrival).toFixed(2);
  const Ws = +(Wq + (1 / meanService)).toFixed(2);
  const Ls = +(meanArrival*Ws).toFixed(2);
  return {
    rho,
    idle,
    Wq,
    Lq,
    Ws,
    Ls
  };
}
else{
    return {rho}
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

const QueueGGC = () => {
    const [formdata,setFormData] = useState({});
    const [data,setData] = useState({});
    
    const handleSubmit = (field,val) => {
        setFormData({...formdata,
            [field]:val
        })
    }

    
    const Submit = (e) => {
        e.preventDefault();
        const {ArrivalTime,ServiceTime,ArrivalVariance,ServiceVariance,Servers} = formdata;
        const model = calculateGGC(ArrivalTime,ServiceTime,ArrivalVariance,ServiceVariance,Servers);
        setData({
          ...model
        })
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
                    label="Arrival Mean"
                    variant="filled"
                    onChange={(e)=>handleSubmit("ArrivalTime",e.target.value)}
                    sx={{
                      marginX: {md:"1vw" ,xs: '4vw'},
                      width:{xs:"90%",md:'15%'},
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
                    label="Service Mean"
                    sx={{
                      marginX: {md:"1vw" ,xs: '4vw'},
                      width:{xs:"90%",md:'15%'},
                      marginY: {md:"1vw" ,xs: '4vw'},
                    }}
                    variant="filled"
                    onChange={(e)=>handleSubmit("ServiceTime",e.target.value)}
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
                    label="Arrival Variance"
                    sx={{
                      marginX: {md:"1vw" ,xs: '4vw'},
                      width:{xs:"90%",md:'15%'},
                      marginY: {md:"1vw" ,xs: '4vw'},
                    }}
                    variant="filled"
                    onChange={(e)=>handleSubmit("ArrivalVariance",e.target.value)}
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
                    label="Service Variance"
                    variant="filled"
                    onChange={(e)=>handleSubmit("ServiceVariance",e.target.value)}
                    sx={{
                      marginX: {md:"1vw" ,xs: '4vw'},
                      width:{xs:"90%",md:'15%'},
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
                  id="filled-suffix-shrink"
                  label="Number of Server"
                  variant="filled"
                  sx={{
                    marginX: {md:"1vw" ,xs: '4vw'},
                    width:{xs:"90%",md:'15%'},
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

export default QueueGGC