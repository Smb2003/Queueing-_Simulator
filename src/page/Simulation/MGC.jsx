import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { filledInputClasses } from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import { InputAdornment, inputBaseClasses, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import generateCummulativeProbabitiy from '../../utils/mgcLogic'


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
    backgroundColor: "#065F46"
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const selectPriority = [
  {
    value: 1,
    label: 'Yes',
  },
  {
    value: 0,
    label: 'No',
  },
];

const MGC = () => {
    const [formdata,setFormData] = useState({});
    const [data,setData] = useState(null);
    
    const handleSubmit = (field,val) => {
        setFormData({...formdata,
            [field]:val
        })
    }

    
    const Submit = (e) => {
        e.preventDefault();
        const result = generateCummulativeProbabitiy(formdata.ArrivalTime,formdata.minServiceTime,formdata.maxServiceTime,formdata.Servers,formdata.Priority);
        setData(result);
        console.log(data);
    }
    
  return (
    <div className='  w-full h-screen'>
        <div className=' flex justify-around items-center py-[2vw] px-[3vw]  '>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{display:{md:'flex'} ,width: {md:"100%"}}}
            >
                <TextField
                  id="filled-suffix-shrink"
                  label="Arrival Time"
                  variant="filled"
                  sx={{
                    marginX: {md:"1vw" ,xs: '4vw'},
                    width:{xs:"90%",md:'16%'},
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
                            width:"1vw",

                          },
                          [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                            opacity: 1,
                            width:"1vw",
                          },
                        }}
                      >
                        Number
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSubmit("ArrivalTime", e.target.value)}
                />
                <TextField
                  id="filled-suffix-shrink"
                  label="Min Service Time"
                  variant="filled"
                  sx={{
                    marginX: {md:"1vw" ,xs: '4vw'},
                    width:{xs:"90%",md:'16%'},
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
                            width:"1vw",

                          },
                          [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                            opacity: 1,
                            width:"1vw",
                          },
                        }}
                      >
                        Number
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSubmit("minServiceTime", e.target.value)}
                />
                <TextField
                  id="filled-suffix-shrink"
                  label="Max Service Time"
                  variant="filled"
                  sx={{
                    marginX: {md:"1vw" ,xs: '4vw'},
                    width:{xs:"90%",md:'16%'},
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
                            width:"1vw",

                          },
                          [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                            opacity: 1,
                            width:"1vw",
                          },
                        }}
                      >
                        Number
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSubmit("maxServiceTime", e.target.value)}
                />
                <TextField
                  id="filled-suffix-shrink"
                  label="Number of Server"
                  variant="filled"
                  sx={{
                    marginX: {md:"1vw" ,xs: '4vw'},
                    width:{xs:"90%",md:'16%'},
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
                            width:"1vw",

                          },
                          [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                            opacity: 1,
                            width:"1vw",
                          },
                        }}
                      >
                        Number
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSubmit("Servers", e.target.value)}
                />

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Priority"
                  sx={{
                    marginX: {md:"1vw" ,xs: '4vw'},
                    width:{xs:"90%",md:'12%'},
                    marginY: {md:"1vw" ,xs: '4vw'},
                  }}
                  defaultValue="0"
                  onChange={(e)=>handleSubmit("Priority",e.target.value)}
                  helperText="Please select priority"
                >
                  {selectPriority.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
               </TextField>
               <div className='flex'>
                <button className='md:w-[10vw] w-full py-4 md:h-[4.4vw] px-2  md:mx-[1vw] md:my-[1vw] rounded-md bg-emerald-800 text-white active:scale-95 hover:bg-emerald-600 text-md' onClick={Submit}>Calculate</button>
               </div>
            </Box>
        </div>
        <Box className="mx-3">
        {
          data?.table ?
            <>
              <TableContainer component={Paper} sx={{
                maxWidth: '1200px', margin: 'auto'
              }}>
                <div className='md:overflow-hidden overflow-x-scroll'>

                  <Table sx={{ minWidth: 700  }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                      <StyledTableCell align="center">Patient ID</StyledTableCell>
                        <StyledTableCell align="center">Arrival Time</StyledTableCell>
                        <StyledTableCell align="center">Service Time</StyledTableCell>
                        {data?.table?.some((item) => item.priority !== undefined) && (
                          <StyledTableCell align="center">Priority</StyledTableCell>
                        )}
                        <StyledTableCell align="center">Start Time</StyledTableCell>
                        <StyledTableCell align="center">End Time</StyledTableCell>
                        <StyledTableCell align="center">Turnaround Time</StyledTableCell>
                        <StyledTableCell align="center">Wait Time</StyledTableCell>
                        <StyledTableCell align="center">Response Time</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.table.map((item,idx) => (
                        <StyledTableRow key={idx}>
                          <StyledTableCell align="center">{idx+1}</StyledTableCell>
                          <StyledTableCell align="center">{item.arrivalTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.serviceTime}</StyledTableCell>
                          {item.priority !== undefined && (
                            <StyledTableCell align="center">{item.priority}</StyledTableCell>
                          )}
                          <StyledTableCell align="center">{item.startTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.endingTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.turnAroundTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.waitingTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.responseTime}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                </TableContainer>
                <div className="flex flex-wrap my-[2vw] mx-[1vw] justify-center">
                  <div className="flex flex-wrap justify-center items-center w-full">
                    {data?.ganttCharts?.length !== 0 ? (
                      data.ganttCharts.map((chart, chartIndex) => (
                        <div
                          key={chartIndex}
                          className="gantt-chart-section my-2 flex flex-col w-full "
                        >
                          <h3 className="text-lg md:text-left text-center font-bold">Chart {chartIndex + 1}</h3>
                          <div className="flex flex-wrap md:justify-start justify-center">
                            {chart.map((item, index) => {
                              const nextItem = chart[index + 1];
                              const idleTime =
                                nextItem && nextItem.start_Time > item.end_Time
                                  ? nextItem.start_Time - item.end_Time
                                  : 0;

                              return (
                                <React.Fragment key={index}>
                                  {/* Gantt Chart Task */}
                                  <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center relative border border-1 py-3 px-2 my-2 border-[#065F46]">
                                    <p className="text-center font-semibold">P{item?.customer_Id + 1}</p>
                                    <p className="absolute bottom-1 left-1">{item?.start_Time}</p>
                                    <p className="absolute bottom-1 right-1">{item?.end_Time}</p>
                                  </div>

                                  {/* Idle Time (if any) */}
                                  {idleTime > 0 && (
                                    <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center flex items-center justify-center relative border border-dashed py-3 px-2 my-2 bg-[#065F46]">
                                      <p className="text-white text-sm">Idle</p>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No Gantt chart data available.</p>
                    )}
                  </div>
                </div>
                <h4 style={{
                  margin: '2em auto',
                  paddingBottom:"5vw",
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>
                  {
                    data?.serverUtilization?.map((utilization,index)=>(
                      <div key={index}> 
                        <p>Server{index+1} Utilization: {utilization.toFixed(2)}%</p>
                      </div>
                    ))
                  }
                    
                </h4>
            </>

            : null
        }
      </Box>
    </div>
  )
}

export default MGC