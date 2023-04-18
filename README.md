# Interview Scheduler

Interview Scheduler is a single-page application to allow users to add, edit and delete appointments between students and interviewers in real time. Built using React with custom hooks, the client app communicates with an API server over HTTP. Data is persisted by the API server using a PostgreSQL database.

Testing is robust and includes individual component testing with Jest, end-to-end testing with Cypress, front-end workshopping with Storybook, among others.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API Server/Database Setup

Client and API server must run concurrently. Fork and clone the repository [here](https://github.com/lighthouse-labs/scheduler-api), and follow the steps outlined in the README to install and set up the database.

## Project Stack

**Front-End:** React, Axios, JSX, HTML, SASS, JavaScript

**Back-End:** Express, Node, PostgreSQL

**Testing:** Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts
- babel
- storybook
- testing-library/jest-dom
- testing-library/react
- testing-library/react-hooks
- prop-types
- react-test-renderer
- sass

## Views
!['Home screen'](https://raw.githubusercontent.com/karilyn/scheduler/628840a0171e33ea12c27b33cf7b5af736b09871/docs/appointment_list.png)
!['save_appointment'](https://raw.githubusercontent.com/karilyn/scheduler/628840a0171e33ea12c27b33cf7b5af736b09871/docs/save_appointment.png)
!['appointment_form'](https://raw.githubusercontent.com/karilyn/scheduler/628840a0171e33ea12c27b33cf7b5af736b09871/docs/appointment_form.png)
!['delete_appointment'](https://raw.githubusercontent.com/karilyn/scheduler/628840a0171e33ea12c27b33cf7b5af736b09871/docs/delete_appointment.png)
