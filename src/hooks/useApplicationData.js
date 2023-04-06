import { useReducer, useEffect } from "react";
import axios from "axios";
import { reducer } from "reducers/reducers";
import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/actions"


// this hook controls the data management
export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  // setDay updates the state for an individual day in our object of states
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise
    .all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);


  // call bookInterview() when a user creates an interview
  function bookInterview(id, interview) {
    // create a copy of selected appointment by id with an optimistic new state
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    // // call the updateSpots function to get a new dayObj copy and then update the st
    // const days = updateSpots(state, appointments)
    // make the put request and then update the state
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then((res) => {
        dispatch({
          type: SET_INTERVIEW,
          value: {
            id,
            interview
          }
        });
      });
  }

  function deleteInterview(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    // const days = updateSpots(state, appointments)
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        dispatch({
          type: SET_INTERVIEW,
          value: {
            id,
            interview: null

          }
        })
    });
  }

  return { state, setDay, bookInterview, deleteInterview }
}