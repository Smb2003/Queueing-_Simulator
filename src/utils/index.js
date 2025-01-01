let cummulativeProbabilities = [];
let cpLookUp = [];
let interArrival = [];
let minNoOfArrival = [];
let arrivalTime = [];
let serviceTime = [];
let startTime = [];
let endingTime = [];
let turnAroundTime = [];
let waitingTime = [];
let responseTime = [];
let priority = [];
let table = [];

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    if (n > 0) {
        return n * factorial(n - 1);
    }
}
function generateCummulativeProbability(meanArrivalNumber, meanServiceNumber,selectedPriority = 0) {
    // Reset all arrays to avoid stale data
    cummulativeProbabilities = [];
    cpLookUp = [];
    interArrival = [];
    minNoOfArrival = [];
    arrivalTime = [];
    serviceTime = [];
    startTime = [];
    endingTime = [];
    turnAroundTime = [];
    waitingTime = [];
    responseTime = [];
    table = [];
    priority = [];

    meanArrivalNumber = Number(meanArrivalNumber);
    meanServiceNumber = Number(meanServiceNumber);

    let cummulativeProbability = 0;
    let x = 0;
    while (cummulativeProbability.toFixed(4) < 1) {
        const newValue = (Math.exp(-meanArrivalNumber) * Math.pow(meanArrivalNumber, x)) / factorial(x);
        cummulativeProbability += newValue;
        cummulativeProbabilities.push(Number(cummulativeProbability.toFixed(4)));
        x += 1;
    }

    //  service times
    for (let i = 0; i < cummulativeProbabilities.length; i++) {
        let result = Math.round(-meanServiceNumber * Math.log(Math.random()));
        while (result < 1) {
            result = Math.round(-meanServiceNumber * Math.log(Math.random()));
        }
        serviceTime.push(result);
    }

    // Calling CP Lookup Table
    CP_LookUp(cummulativeProbabilities);

    // Generate minimum number of arrivals
    genMinNoOfArrival();

    // Calling Priority Genereator...
    if(selectedPriority === 1){
      PriorityGeneration(55,1994,9,10112166,minNoOfArrival.length,1,3);
    }
    // Generate inter-arrival times
    interArrival[0] = 0; 
    for (let i = 1; i < minNoOfArrival.length; i++) {
        const result = generateInterArrival(cpLookUp, cummulativeProbabilities, minNoOfArrival);
        interArrival.push(result);
    }

    // Generate arrival times
    for (let i = 0; i < interArrival.length; i++) {
        arrivalTime.push(i === 0 ? 0 : arrivalTime[i - 1] + interArrival[i]);
    }

    const ganttChart = calculateSchedule(arrivalTime, serviceTime, priority);

    // Calculate performance measures
    performanceMeasures(arrivalTime, serviceTime,ganttChart,selectedPriority);

    // Calculate server utilization
    const totalServiceTime = serviceTime.reduce((a, b) => a + b, 0);
    const serverUtilization = (totalServiceTime / totalServiceTime) * 100;

    for (let i = 0; i < arrivalTime.length; i++) {
        table.push({
            arrivalTime: arrivalTime[i],
            startTime: startTime[i],
            endingTime: endingTime[i],
            serviceTime: serviceTime[i],
            turnAroundTime: turnAroundTime[i],
            waitingTime: waitingTime[i],
            responseTime: responseTime[i],
            priority: priority[i]
        });
    }

    // Return all arrays and computed values
    return {
        cummulativeProbabilities,
        cpLookUp,
        interArrival,
        minNoOfArrival,
        arrivalTime,
        serviceTime,
        startTime,
        endingTime,
        turnAroundTime,
        waitingTime,
        responseTime,
        serverUtilization,
        priority,
        table,
        ganttChart
    };   
}

function CP_LookUp(cummulativeProbabilities) {
    cpLookUp[0] = 0;
    for (let i = 0; i < cummulativeProbabilities.length - 1; i++) {
        cpLookUp.push(cummulativeProbabilities[i]);
    }
}

function genMinNoOfArrival() {
    for (let i = 0; i < cummulativeProbabilities.length; i++) {
        minNoOfArrival.push(i);
    }
}

function generateInterArrival(cpTable, cummulativeProbabilities, minNoOfArrival) {
    while (true) {
        let genIA = Number(Math.random().toFixed(4));
        for (let i = 1; i < cpTable.length; i++) {
            if (cpTable[i] <= genIA && genIA < cummulativeProbabilities[i]) {
                return minNoOfArrival[i];
            }
        }
    }
}

function performanceMeasures(arrivalTime, serviceTime,ganttChart,selectedPriority) {
  if(selectedPriority ===1){
    let processedCustomersStart = new Set();
    let processedCustomersEnd = new Set();

    // Initialize arrays to ensure alignment with all customers
    startTime = Array(arrivalTime.length).fill(null);
    endingTime = Array(arrivalTime.length).fill(null);
    turnAroundTime = [];
    waitingTime = [];
    responseTime = [];
    console.log(ganttChart);
    // Filter ganttChart entries for all priorities (1, 2, 3)
    const filteredGanttChart = ganttChart.filter(entry => 
      entry.priority === 1 || entry.priority === 2 || entry.priority === 3
    );

    // Process Start Time
    filteredGanttChart.forEach((entry) => {
      if (!processedCustomersStart.has(entry.customer_Id)) {
        startTime[entry.customer_Id] = entry.start_Time; // Store start time based on customer_Id
        processedCustomersStart.add(entry.customer_Id);
      }
    });

    // Process End Time in reverse order
    for (let i = filteredGanttChart.length - 1; i >= 0; i--) {
      let entry = filteredGanttChart[i];
      if (!processedCustomersEnd.has(entry.customer_Id)) {
        endingTime[entry.customer_Id] = entry.end_Time; // Store end time based on customer_Id
        processedCustomersEnd.add(entry.customer_Id);
      }
    }

    // Calculate Turnaround Time, Waiting Time, and Response Time
    for (let i = 0; i < arrivalTime.length; i++) {
      if (startTime[i] !== null && endingTime[i] !== null) { 
        turnAroundTime.push(endingTime[i] - arrivalTime[i]); // TAT = End Time - Arrival Time
        waitingTime.push(turnAroundTime[i] - serviceTime[i]); // WT = TAT - Service Time
        responseTime.push(startTime[i] - arrivalTime[i]); // RT = Start Time - Arrival Time
      } else {
        turnAroundTime.push(null); // For missing customers, push null
        waitingTime.push(null);
        responseTime.push(null);
      }
    }
  } 

  else{
    for (let i = 0; i < arrivalTime.length; i++) {
        startTime.push(i === 0 ? arrivalTime[i] : Math.max(arrivalTime[i], endingTime[i - 1]));
        endingTime.push(startTime[i] + serviceTime[i]);
        turnAroundTime.push(endingTime[i] - arrivalTime[i]);
        waitingTime.push(turnAroundTime[i] - serviceTime[i]);
        responseTime.push(startTime[i] - arrivalTime[i]);
    }
  }
}

export default generateCummulativeProbability;

const genPriority = (a,b,xI) => {
  return (Math.round((b-a)*xI+a));
}
function PriorityGeneration (A,M,C,Z,len,a,b) {
    
    let minusZi = [];
    let zI = [];
    minusZi[0] = Z;
    for(let i = 0; i < len; i++){
        let mod = (A*minusZi[i]+C) % M;
        zI.push(mod)
        minusZi.push(zI[i]);
        let random = Number((zI[i]/M).toFixed(4));
        priority.push(genPriority(a,b,random));
    }
        console.log(priority);
}


// PRIORITY...
function calculateSchedule(arrivalTimes, serviceTimes, priorities) {
  const ganttChart = []; // To store the Gantt chart (customer_Id, start_Time, end_Time, priority)
  const queue = []; // Priority queue for preemption
  let currentTime = 0;

  // Create customers array
  const customers = arrivalTimes.map((arrival, index) => ({
    id: index,
    arrivalTime: arrival,
    serviceTime: serviceTimes[index],
    priority: priorities[index],
  }));

  // Sort customers by arrival time
  customers.sort((a, b) => a.arrivalTime - b.arrivalTime);

  // Function to add customers to the queue when they arrive
  const addToQueue = (currentTime) => {
    customers.forEach((customer) => {
      if (
        customer.arrivalTime <= currentTime &&
        customer.serviceTime > 0 &&
        !queue.some((q) => q.id === customer.id)
      ) {
        queue.push(customer);
      }
    });
    // Sort the queue by priority (ascending) and arrival time
    queue.sort((a, b) =>
      a.priority === b.priority
        ? a.arrivalTime - b.arrivalTime
        : a.priority - b.priority
    );
  };

  while (queue.length > 0 || customers.some((c) => c.serviceTime > 0)) {
    // Add customers who have arrived to the queue
    addToQueue(currentTime);

    if (queue.length === 0) {
      // If no one is in the queue, fast forward to the next customer's arrival
      currentTime = Math.min(
        ...customers
          .filter((c) => c.serviceTime > 0)
          .map((c) => c.arrivalTime)
      );
      addToQueue(currentTime);
    }

    // Serve the highest-priority customer in the queue
    const currentCustomer = queue.shift();

    // Calculate the service duration
    const nextArrivalTime = customers
      .filter(
        (c) => c.arrivalTime > currentTime && c.serviceTime > 0
      )
      .map((c) => c.arrivalTime)[0] || Infinity;

    const serviceDuration = Math.min(
      currentCustomer.serviceTime,
      nextArrivalTime - currentTime
    );

    // Record start and end time in the Gantt Chart
    ganttChart.push({
      customer_Id: currentCustomer.id,
      priority: currentCustomer.priority,
      start_Time: currentTime,
      end_Time: currentTime + serviceDuration,
    });

    // Update the service time and current time
    currentCustomer.serviceTime -= serviceDuration;
    currentTime += serviceDuration;

    // Check if higher, moderate, or lower priority customers have arrived
    addToQueue(currentTime);

    // Re-add the current customer to the queue if it is not fully served
    if (currentCustomer.serviceTime > 0) {
      queue.push(currentCustomer);
      queue.sort((a, b) =>
        a.priority === b.priority
          ? a.arrivalTime - b.arrivalTime
          : a.priority - b.priority
      );
    }
  }

  // Merge consecutive entries for the same customer in the Gantt chart
  const mergedGanttChart = [];
  for (let i = 0; i < ganttChart.length; i++) {
    const current = ganttChart[i];
    if (
      mergedGanttChart.length > 0 &&
      mergedGanttChart[mergedGanttChart.length - 1].customer_Id ===
        current.customer_Id
    ) {
      // Extend the end time of the last merged entry
      mergedGanttChart[mergedGanttChart.length - 1].end_Time = current.end_Time;
    } else {
      // Add a new entry to the merged Gantt chart
      mergedGanttChart.push({ ...current });
    }
  }

  return mergedGanttChart;
}
