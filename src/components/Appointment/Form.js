import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  // keep track of the name and interviewer state
  const [currentStudent, setStudent] = useState(props.student || '');
  const [currentInterviewer, setInterviewer] = useState(
    props.interviewer || null
  );
  const [error, setError] = useState('');

  // helper function to reset input fields
  function reset() {
    setStudent('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function validate() {
    if (currentStudent === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (currentInterviewer === null) {
      setError('Please select an interviewer');
      return;
    }

    setError('');

    props.onSave(currentStudent, currentInterviewer);
  }

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            value={currentStudent}
            student={props.student}
            type='text'
            placeholder='Enter Student Name'
            onChange={(event) => setStudent(event.target.value)}
            data-testid='student-name-input'
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={currentInterviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
