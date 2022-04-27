import { fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

import SignIn from './Login'

// describe allows you to describe a test suite under a particular theme of choosing
describe('<Login/>', () => {
  var username = null;
  var password = null;
  var submit = null;

  // this happens before each "it()". we are rerendering our component and selecting the elements in the DOM before each test
  beforeEach(() => {
    // we create a container, and set up our environment by rendering our component
    render(<Router><SignIn /></Router>)
    // from there we can grab elements in the DOM using the following react testing library API
    username = screen.getByRole('textbox', { name: /username/i });
    password = screen.getByLabelText(/password/i);
    submit = screen.getByRole('button', { name: /sign in/i });
  })

  // can nest describe() for more focused tests (in this case, password-specific errors)
  // test suite for password errors
  describe('Password errors', () => {
    beforeEach(() => {
      fireEvent.change(username, { target: { value: "validusername" } });
    })

    // it() describes a test in the component
    it('Should render helperText for a password that is too short', () => {
      fireEvent.change(password, { target: { value: "evil" } });
      fireEvent.click(submit);
      expect(screen
        .getByText('"Password" length must be at least 6 characters long'))
        .toBeInTheDocument()
    })

    it("Should render helperText for an empty password", () => {
      fireEvent.change(password, { target: { value: "" } });
      fireEvent.click(submit);
      expect(screen
        .getByText('"Password" is not allowed to be empty'))
        .toBeInTheDocument()
    })

    it("Should render helperText for a password length more than the maximum", () => {
      fireEvent.change(password, 
        { target: { value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" } });
      fireEvent.click(submit);
      expect(screen
        .getByText('"Password" length must be less than or equal to 64 characters long'))
        .toBeInTheDocument()
    })
  })

  // test suite for username errors
  describe('Username errors', () => {
    beforeEach(() => {
      fireEvent.change(password, { target: { value: "Validpassword123" } });
    })

    it('Should render helperText for a username that is too short', () => {
      fireEvent.change(username, { target: { value: "evil" } });
      fireEvent.click(submit);
      expect(screen
        .getByText('"Username" length must be at least 5 characters long'))
        .toBeInTheDocument()
    })

    it("Should render helperText for an empty username", () => {
      fireEvent.change(username, { target: { value: "" } });
      fireEvent.click(submit);
      expect(screen
        .getByText('"Username" is not allowed to be empty'))
        .toBeInTheDocument()
    })

    it("Should render helperText for a username length more than the maximum", () => {
      fireEvent.change(username, 
        { target: { value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" } });
      fireEvent.click(submit);
      expect(screen
        .getByText('"Username" length must be less than or equal to 32 characters long'))
        .toBeInTheDocument()
    })
  })
})