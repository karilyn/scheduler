import React from "react";
import './styles.scss'
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";



export default function Appointment(props) {
  // visual mode constants used to setMode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    // new interview object gets passed to bookInterview function
    props
      .bookInterview(props.id, interview)
    // returns a promise which has a callback
      .then(() => transition(SHOW))
    console.log("bookInterview:", props.id, interview)
  }

  function remove(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props
      .deleteInterview(props.id, interview)
      .then(() => transition(EMPTY))
  }

  // function edit(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  //   // new interview object gets passed to editInterview function
  //   props
  //     .editInterview(props.id, interview)
  //     .then(() => transition(SAVING))
  //   // returns a promise which has a callback
  //     .then(() => transition(SHOW))
  //   console.log("editInterview:", props.id, interview)
  // }



  // import functions used to transition to different visual modes and set mode to SHOW or EMPTY depending on if interview is booked
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && props.interview && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving appointment"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={remove}
          message="Are you sure you want to delete this appointment?"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting appointment"
        />
      )
      }


    </article>
  )
}

