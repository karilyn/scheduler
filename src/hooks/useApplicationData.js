import { useState, useEffect } from "react";
import axios from "axios";

// this hook controls the data management
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then(all => {
      setState(prev => ({
        ...prev,
        days:all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);

  // setDay updates the state for an individual day in our object of states
  const setDay = (day) => setState({ ...state, day });


  function updateSpots(appointments) {
    // we will return the result of mapping over each dayObj in state.days
    return state.days.map((dayObj) => {
      // start by finding the specific day when the names match
      if (state.day === dayObj.name) {
        let spotsRemaining = 0;
        // loop over the appointmentKeys in appointments
        for (const appointmentKey in appointments) {
          let appointment = appointments[appointmentKey];
          // add to spotsRemaining if the appointment.id is in dayObj's appointments and it's null
          if (dayObj.appointments.includes(appointment.id) && !appointment.interview) {
            console.log("appointment found:", appointment)
            spotsRemaining++;
          }
        }
        // return a new dayObject copy with an updated spots value
        return {...dayObj, spots: spotsRemaining};
      }
      return dayObj;
    })
  }



  // call bookInterview() when a user creates an interview
  function bookInterview(id, interview) {
    // create a copy of selected appointment by id with an optimistic new state
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // call the updateSpots function to get a new dayObj copy and then update the state with it
    const days = updateSpots(appointments)

    console.log("days:", days)
    // make the put request and then update the state
    return axios
      .put(`/api/appointments/${id}`, {
      interview
    })
      .then((res) => setState({
      ...state,
      appointments,
      days

    }));
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments)
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => setState({
      ...state,
      appointments,
      days
    }));
  }

  return { state, setDay, bookInterview, deleteInterview }
}