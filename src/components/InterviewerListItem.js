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

 // conditionally render selected interviewer's name
  const formatInterviewer = function(interviewer) {
    if (props.selected === true) {
      return `${interviewer}`
    }
  }

  return (
    <li
      className={interviewersClass}
      // TODO: seems like it's not actually setting their id???
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {formatInterviewer(props.name) }
    </li>

  )

}