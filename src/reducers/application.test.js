import { reducer, updateSpots } from "./application";
import React from 'react';

import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});
