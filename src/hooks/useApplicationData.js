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
    // make the put request and then update the state
    return axios
      .put(`/api/appointments/${id}`, {
      interview
    })
      .then((res) => setState({
      ...state,
      appointments
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
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => setState({
      ...state,
      appointments
    }));
  }

  return { state, setDay, bookInterview, deleteInterview }
}