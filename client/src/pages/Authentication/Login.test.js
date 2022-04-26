import { experimentalStyled } from '@mui/material'
import {render, screen} from '@testing-library/react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SignIn from './Login'

// describe allows you to describe a whole test case for a component
describe("Login Component", () => {
  
  // it keyword describes an event in this component (a test)
  it("rendered input", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    )
    // const { getByTestId } = render(
    //     <SignIn />
    // )
    const input = getByTestId("username")
    expect(input).toBeTruthy()
  })
})