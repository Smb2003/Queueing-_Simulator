import React, { useState } from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { filledInputClasses } from '@mui/material/FilledInput';
import { InputAdornment, inputBaseClasses, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import generateCummulativeProbabitiy from '../../utils/index.js'
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#065F46",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // border: 1,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: "#065F46",
    // Scale
    // border: 1,
    // color: "white"
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
const MM1 = () => {
    const [formdata,setFormData] = useState({});
    const [data,setData] = useState(null);
    
    const handleSubmit = (field,val) => {
        setFormData({...formdata,
            [field]:val
        })
    }

    
    const Submit = (e) => {
        e.preventDefault();
        const result = generateCummulativeProbabitiy(formdata.ArrivalTime,formdata.ServiceTime,formdata.Priority);
        setData(result);
        
    }

    console.log(data);

    
  return (
    <div className='  w-full h-screen'>
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-around">
          <Box component="form" noValidate autoComplete="off" className="w-full md:flex md:py-5 md:px-6">
            <TextField
              label="Arrival Time"
              variant="filled"
              onChange={(e) => handleSubmit("ArrivalTime", e.target.value)}
              sx={{
                marginX: {md:"1vw" ,xs: '4vw'},
                width:{xs:"90%",md:'30%'},
                marginY: {md:"1vw" ,xs: '4vw'},
                
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        alignSelf: "flex-end",
                        opacity: 0,
                        pointerEvents: "none",
                        [`.${filledInputClasses.root} &`]: {
                          borderRadius: "20px",
                        },
                        [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                          color: "white",
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

            {/* Service Time Field */}
            <TextField
              label="Service Time"
              variant="filled"
              onChange={(e) => handleSubmit("ServiceTime", e.target.value)}
              sx={{
                marginX: {md:"1vw" ,xs: '4vw'},
                width:{xs:"90%",md:'30%'},
                marginY: {md:"1vw" ,xs: '4vw'},
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        alignSelf: "flex-end",
                        opacity: 0,
                        pointerEvents: "none",
                        [`.${filledInputClasses.root} &`]: {
                          borderRadius: "20px",
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

            {/* Priority Field */}
            <TextField
              id="outlined-select-currency"
              select
              label="Priority"
              helperText="Please select priority"
              defaultValue="0"
              onChange={(e) => handleSubmit("Priority", e.target.value)}
              sx={{
                marginX: {md:"1vw" ,xs: '4vw'},
                width:{xs:"90%",md:'30%'},
                marginY: {md:"1vw" ,xs: '4vw'},
              }}
            >
              {selectPriority.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Submit Button */}
            <div className="flex justify-center ">
              <button
                className="w-[90%] md:w-[10vw] md:h-[4.4vw]  md:py-0 py-[3vw] mx-2 my-2 md:ml-7 rounded-md bg-emerald-800 text-white active:scale-95 hover:bg-emerald-600 text-md"
                onClick={Submit}
              >
                Calculate
              </button>
            </div>
          </Box>
        </div>

        <Box sx={{marginX:{xs:"15px"}, marginY:{xs:"5px"}}}>
        {
          data?.table ?
            <>
              <TableContainer component={Paper} sx={{
                maxWidth: '1200px', margin: 'auto'
                }}>
                <div className='md:overflow-hidden  overflow-scroll'>

                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                      {data?.table.map((item, idx) => (
                        <StyledTableRow key={idx}>
                          <StyledTableCell align="center">{idx + 1}</StyledTableCell>
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
              <div>
                <h4 style={{
                  margin: '1em auto',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                  }}>
                      Gantt Chart
                </h4>
                <div className='flex flex-wrap my-[2vw] mx-[1vw] justify-center'>
                  <div className="flex items-center justify-center flex-wrap">
                  {
                    data?.ganttChart?.length !== 0 ? (
                      data?.ganttChart?.map((item, index) => {
                        const nextItem = data.ganttChart[index + 1];
                        const idleTime =
                          nextItem && nextItem.start_Time > item.end_Time
                            ? nextItem.start_Time - item.end_Time
                            : 0;

                        return (
                          <React.Fragment key={index}>
                            {/* Gantt Chart Task */}
                            <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center relative border border-1 py-3 px-2 my-2  border-[#065F46] ">
                              <p className="text-center font-semibold">P{item?.customer_Id+1}</p>
                              <p className="absolute bottom-1 left-1">{item?.start_Time}</p>
                              <p className="absolute bottom-1 right-1">{item?.end_Time}</p>
                            </div>

                            {/* Idle Time (if any) */}
                            {idleTime > 0 && (
                              <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center  flex items-center justify-center relative border border-dashed py-3 px-2 bg-[#065F46] ">
                                <p className="text-white text-sm">Idle</p>  
                              </div>
                              )}
                          </React.Fragment>
                        );
                      })) : null
                    }
                  </div>
                  
                </div>
                </div>
                <h4 style={{
                  margin: '1em auto',
                  paddingBottom:'15px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>
                    Server Utilization: {data.serverUtilization}%
                </h4>
            </>

            : null
        }
      </Box>
    </div>
  )
}

export default MM1