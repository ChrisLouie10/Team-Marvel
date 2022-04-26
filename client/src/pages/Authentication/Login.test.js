import { fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

import SignIn from './Login'

// describe allows you to describe a whole test suite for a component
describe("<Login />", () => {
  
  // it keyword describes an event in this component (a test)
  it("Should render helperText for a password length less than minimum", () => {
    const { container, getByText, getByTestId } = render(<Router><SignIn /></Router>)

    const username = getByTestId("username-textfield");
    const password = getByTestId("password-textfield");
    const submit = getByTestId("submit-btn");

    fireEvent.change(username, { target: { value: "validusername" } });
    fireEvent.change(password, { target: { value: "evil" } });
    fireEvent.click(submit);

    expect(getByText('"Password" length must be at least 6 characters long')).toBeInTheDocument()
  })

  it("Should render helperText for an empty password", () => {
    const { container, getByText, getByTestId } = render(<Router><SignIn /></Router>)

    const username = getByTestId("username-textfield");
    const password = getByTestId("password-textfield");
    const submit = getByTestId("submit-btn");

    fireEvent.change(username, { target: { value: "validusername" } });
    fireEvent.change(password, { target: { value: "" } });
    fireEvent.click(submit);

    expect(getByText('"Password" is not allowed to be empty')).toBeInTheDocument()
  })

  it("Should render helperText for a password length more than the maximum", () => {
    const { container, getByText, getByTestId } = render(<Router><SignIn /></Router>)

    const username = getByTestId("username-textfield");
    const password = getByTestId("password-textfield");
    const submit = getByTestId("submit-btn");

    fireEvent.change(username, { target: { value: "validusername" } });
    fireEvent.change(password, 
      { target: { value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" } });
    fireEvent.click(submit);

    expect(getByText('"Password" length must be less than or equal to 64 characters long')).toBeInTheDocument()
  })
})