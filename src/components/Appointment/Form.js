import React, { useState }  from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // keep track of the name and interviewer state
  const [currentStudent, setStudent] = useState(props.student || "")
  const [currentInterviewer, setInterviewer] = useState(props.interviewer || null)

  // helper function to reset input fields
  function reset() {
    setStudent("")
    setInterviewer(null)
  }

  function cancel() {
    reset();
    props.onCancel()
  }

  function save() {
    props.onSave(currentStudent, currentInterviewer)
  }

  // function delete() {
  //   props.onDelete()
  // }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={currentStudent}
            student={props.student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={currentInterviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>

  )
}