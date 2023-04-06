import React from 'react';
import DayListItem from './DayListItem';

// DayList accepts 3 props:
// 1. [days]: an array of day objects, each containing an id, name and spots
// 2. day (a string, the currently selected day)
// 3. setDay function which accepts the day
export default function DayList(props) {
  // The <DayList> renders and passes props to the <DayListItem> children causing the updates to the selected visual state.
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{days}</ul>;
}
