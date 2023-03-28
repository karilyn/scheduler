export function getAppointmentsForDay(state, day) {
  if (!state.days || state.days.length === 0) {
    return [];
  }
  const filteredDay = state.days.filter(d => d.name === day)[0];
  if (!filteredDay) {
    return [];
  }
  let availAppointments = [];
  filteredDay.appointments.forEach(id => {
    availAppointments.push(state.appointments[id])
  });
  return availAppointments;
}