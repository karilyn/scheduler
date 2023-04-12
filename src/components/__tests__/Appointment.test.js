import React from 'react';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup } from '@testing-library/react';

import Appointment from 'components/Appointment';

afterEach(cleanup);
/*
  First test is that it simply renders a React Component
*/
describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
});
