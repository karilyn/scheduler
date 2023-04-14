import React from 'react';

import axios from 'axios';

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  queryByText,
  getByPlaceholderText,
  getByAltText,
  getAllByTestId,
  queryByAltText,
  getByDisplayValue,
  prettyDOM,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    //  1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, 'appointment')[0];
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, 'Add'));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, 'Save'));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /saving appointment/i)).toBeInTheDocument();
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(queryByAltText(appointment, 'Delete'));
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(
        appointment,
        /are you sure you want to delete this appointment?/i
      )
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting appointment/i)).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
    // debug();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    expect(getByDisplayValue(appointment, 'Archie Cohen'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Karilyn Kempton' },
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, /saving appointment/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Karilyn Kempton'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    expect(getByDisplayValue(appointment, 'Archie Cohen'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Karilyn Kempton' },
    });
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, /saving appointment/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /could not save appointment/i)
    );

    expect(
      getByText(appointment, /could not save appointment/i)
    ).toBeInTheDocument();
  });

  it('shows the delete error when failing to save an appointment', async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    expect(
      getByText(
        appointment,
        /are you sure you want to delete this appointment?/i
      )
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, /deleting appointment/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /could not delete appointment/i)
    );

    expect(
      getByText(appointment, /could not delete appointment/i)
    ).toBeInTheDocument();
  });
});
