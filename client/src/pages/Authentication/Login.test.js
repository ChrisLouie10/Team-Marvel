import { fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

import SignIn from './Login'

// mock API's login authentication functions, to avoid calling real API
const provider = require('../../api/provider');
jest.mock('../../api/provider');
beforeEach(() => {
  /*
   instead of calling functions defined in provider.js,
   the real code will be ignored and these hardcoded values will be returned
  */
  provider.loginAuth.mockResolvedValue({
    data: {
      success: true,
      token: 'abc'
    },
  });

  provider.getUserByUsername.mockResolvedValue({
    data: {
      id: 'Marvel-1',
      username: 'Marvel'
    }
  })
})

// mock data setter functions, because real ones were causing errors (only during testing)
const mockSetData = jest.fn()
const mockSetAuth = jest.fn()
jest.mock('../../hooks/useAuth', () => {
  const useAuth = () => ({
    // when useAuth is destructured to get setAuth & setData in Login, these mock functions will be received instead
    setAuth: mockSetAuth,
    setData: mockSetData
  })
  return useAuth;
});

// mock the navigation function, to know if it gets called
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate // replace original function with mock
}));


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

  describe('Navigation from Login to user Dashboard', () => {

    // makes sure navigation is working by checking to see if the navigation function got called
    it("calls the navigation function after a successful login", async () => {
      // simulate a valid login
      fireEvent.change(username, { target: { value: "Marvel" } });
      fireEvent.change(password, { target: { value: "Marvel" } });
      fireEvent.click(submit);

      // wait for functions in Login's submit handler to finish running
      await new Promise((r) => setTimeout(r, 2000));

      // check if functions before navigation are being called
      // expect(mockSetData).toHaveBeenCalled();
      // expect(mockSetAuth).toHaveBeenCalled();

      // make sure it was called, and with correct argument
      expect(mockUseNavigate).toHaveBeenCalled();
      // Checks if the list of args has the correct path. Other args in the list don't need to be strictly checked
      expect(mockUseNavigate.mock.calls[0]).toContain('/user/host')
    })
  })
})
