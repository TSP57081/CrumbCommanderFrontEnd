import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { CONFIG } from "../config.js";

const WeeklySchedule = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const temp_shifts = [];
      const response = await fetch(`${CONFIG.BASE_PATH}get_all_shifts`);
      if (response.ok) {
        const data = await response.json();
        const shiftArray = data.shifts;
        console.log(shiftArray);
        for (let i = 0; i < shiftArray.length; i++) {
          let startTime = shiftArray[i].StartTime;
          let endTime = shiftArray[i].EndTime;
          if (startTime.length === 7) {
            startTime = `0${shiftArray[i].StartTime}`;
          }
          if (endTime.length === 7) {
            endTime = `0${shiftArray[i].EndTime}`;
          }
          const title = `${shiftArray[i].ShiftID} - ${shiftArray[i].EmployeeName}`;
          const start = `${shiftArray[i].Date}T${startTime}`;
          const end = `${shiftArray[i].Date}T${endTime}`;

          temp_shifts.push({
            title: title,
            start: start,
            end: end,
          });
        }
      }
      setShifts(temp_shifts);
      console.log(temp_shifts);
    };
    fetchData();
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={shifts}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        editable={false}
        selectable={false}
        weekends={true}
        eventColor="#378006"
        eventBackgroundColor="#FC9595"
        eventTextColor="#000000"
        eventBorderColor="#fcdda2"
      />
    </div>
  );
};

export default WeeklySchedule;
