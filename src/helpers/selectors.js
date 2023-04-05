/* Returns an array of appointments for a given day */
export function getAppointmentsForDay(state, day) {
  if (!state.days || state.days.length === 0) {
    return [];
  }
  // filter by day
  const filteredDay = state.days.filter(d => d.name === day)[0];
  if (!filteredDay) {
    return [];
  }
  /* loop through filteredDay array find the associated apointments for that day */
  let availAppointments = [];
  filteredDay.appointments.forEach(id => {
    availAppointments.push(state.appointments[id])
  });
  return availAppointments;
}

/* Return an interview object which matches the partial interview provided */
export function getInterview(state, interview) {
  // return null if there's no interview
  if (!interview) {
    return null;
  }
  // the interviewObj comes from the interviewer object found at the key matching the interviewer id in the interview
  const interviewerObj = state.interviewers[interview.interviewer];

  const interviewObj = {
    student: interview.student,
    interviewer: interviewerObj
  };
  // return the new interview object
  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  if (!state.interviewers || state.days.length === 0) {
    return [];
  }
  const filteredDay = state.days.filter(d => d.name === day)[0];
  if (!filteredDay) {
    return [];
  }
  if (typeof filteredDay.interviewers === "undefined") {
    return [];
  }

  let availInterviewers = [];
  filteredDay.interviewers.forEach(id => {
    availInterviewers.push(state.interviewers[id])
  });
  return availInterviewers;
}