import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

// represents one interviewer and has two states
// states are not selected and selected, shown by highlighting in white
// interviewer object has the following props: id, name, avatar
export default function InterviewerListItem(props) {

  // conditionally render class
  let interviewersClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });


  return (
    <li
      className={interviewersClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}