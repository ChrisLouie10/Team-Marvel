import { fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

import Register from './Register'

describe('<Register>', () => {
    var username = null;
    var password = null;
    var submit = null;

    beforeEach(() => {
        // we create a container, and set up our environment by rendering our component
        render(<Router><Register /></Router>)
        // from there we can grab elements in the DOM using the following react testing library API
        username = screen.getByRole('textbox', { name: /username/i });
        password = screen.getByLabelText(/password/i);
        submit = screen.getByRole('button', { name: /sign up/i });
      })

      //Test suite for username errors
      describe('Username errors', () => {
        beforeEach(() => {
            fireEvent.change(password, { target: { value: "mypassword1" } });
          })
    
        it('Should render helperText for a username that is too short', () => {
          fireEvent.change(username, { target: { value: "abc" } });
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
            { target: { value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" } });
          fireEvent.click(submit);
          expect(screen
            .getByText('"Username" length must be less than or equal to 32 characters long'))
            .toBeInTheDocument()
        })
      })

      describe('Password errors', () => {
        beforeEach(() => {
            fireEvent.change(username, { target: { value: "newuser1" } });
          })
          // it() describes a test in the component
    it('Should render helperText for a password that is too short', () => {
        fireEvent.change(password, { target: { value: "pass" } });
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
          { target: { value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" } });
        fireEvent.click(submit);
        expect(screen
          .getByText('"Password" length must be less than or equal to 64 characters long'))
          .toBeInTheDocument()
        })
      })
})

