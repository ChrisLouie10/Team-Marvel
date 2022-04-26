import { fireEvent, screen} from '@testing-library/react'
import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom';

import SignIn from './Login'

let container = null

beforeEach(() => {
  console.log("Before each")
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  console.log("After each")
  // unmountComponentAtNode(container)
  // container.remove()
  // container = null
})

// describe allows you to describe a whole test case for a component
describe("<Login />", () => {
  
  // it keyword describes an event in this component (a test)
  it("Should render username input", () => {
    const root = createRoot(container)
    act(() => {
      root.render(<Router><SignIn /></Router>);
    });

    const usernameInput = document.querySelector("[data-testid=username]")
    const passwordInput = document.querySelector("[data-testid=password]")
    const submitBtn = document.querySelector("[data-testid=submit-btn]")

    act(() => {

      // enter credentials
      usernameInput.value = "j3"
      passwordInput.value = "validpassword"

      submitBtn.dispatchEvent(
        new MouseEvent("click", {bubbles:true})
      )
    })

    
    const errors = document.querySelector("[data-testid=errors]")
    console.log(errors.textContent)
    // console.log(usernameInput.value)
    // console.log(errors)
    // act(() => {
    //   console.log(submitBtn)
    //   submitBtn.dispatchEvent(
    //     new MouseEvent("click", {bubbles:true})
    //   )
    // })
  })
})