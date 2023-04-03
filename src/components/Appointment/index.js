import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";




export default function Appointment(props) {
  // visual mode constants used to setMode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    // new interview object gets passed to bookInterview function
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    console.log("bookInterview:", props.id, interview)

  }

  // import functions used to transition to different visual modes and set mode to SHOW or EMPTY depending on if interview is booked
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving appointment"
        />
      )}


    </article>
  )
}

