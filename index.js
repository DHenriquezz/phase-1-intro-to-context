// Your code here
function createEmployeeRecord(array) {
    const employeeRecord = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
    return employeeRecord;
  }
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray));
  }
function createTimeInEvent(employeeRecord, timeStamp){
    const [date, hour] = timeStamp.split(" ")
    employeeRecord.timeInEvents.push({
        type : "TimeIn",
        hour : parseInt(hour, 10),
        date : date
    }) 
    return employeeRecord
}
function createTimeOutEvent (employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type : "TimeOut",
        hour : parseInt(hour, 10),
        date : date
    })
    return employeeRecord
}function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    const hoursWorked = employeeRecord.timeInEvents.reduce((total, event) => {
      if (event.date === date) {
        const timeIn = parseInt(event.hour, 10);
        const timeOut = parseInt(timeOutEvent.hour, 10);
        total += (timeOut - timeIn) / 100;
      }
      return total;
    }, 0);
    
    return hoursWorked;
  }
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
  }
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
  
    const totalWages = datesWorked.reduce((acc, date) => {
      return acc + wagesEarnedOnDate(employee, date);
    }, 0);
  
    return totalWages;
  }
  function calculatePayroll(employees) {
    return employees.reduce((totalPay, employee) => {
      return totalPay + allWagesFor(employee)
    }, 0)
  }
