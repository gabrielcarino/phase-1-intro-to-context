// Your code here
function createEmployeeRecord(employee) {
  return {
    firstName : employee[0],
    familyName : employee[1],
    title : employee[2],
    payPerHour : employee[3],
    timeInEvents : [],
    timeOutEvents : [],
  };
};
function createEmployeeRecords(roster) {
  return roster.map(createEmployeeRecord);
};
function createTimeInEvent(empRec, time) {
  empRec.timeInEvents.push(
    {type: "TimeIn",
    hour: parseInt(time.slice(11)),
    date: time.slice(0,10)});
  return empRec;
};
function createTimeOutEvent(empRec, time) {
  empRec.timeOutEvents.push(
    {type:"TimeOut",
    hour: parseInt(time.slice(11)),
    date: time.slice(0,10)});
  return empRec;
};
function hoursWorkedOnDate(empRec, date) {
  return (empRec.timeOutEvents.find(punch => {
    return punch.date === date;}).hour-empRec.timeInEvents.find(punch => {
      return punch.date === date;}).hour)/100;
};
function wagesEarnedOnDate(empRec, date) {
  return hoursWorkedOnDate(empRec, date)*empRec.payPerHour;
};
function allWagesFor(empRec) {
  const wages = empRec.timeInEvents.map(punch => wagesEarnedOnDate(empRec, punch.date))
  return wages.reduce((prev, curr) => prev+curr);
};
function calculatePayroll(empRecs) {
  return empRecs.reduce((prev, curr) => prev + allWagesFor(curr),0);
};