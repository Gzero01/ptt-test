SELECT
cs.EmployeeID,
ws.WorkDate,
MIN(cs.Clock) AS ClockIn,
MAX(cs.Clock) AS ClockOut
FROM CardScan cs 
JOIN WorkSchedule ws on cs.EmployeeID=ws.EmployeeID
GROUP by cs.EmployeeID