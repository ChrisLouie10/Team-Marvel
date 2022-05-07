import { fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

import UserNavbar from './UserNavbar'

describe("<UserNavbar />", () => {
    var joinBtn = null
    var logoutBtn = null

    describe('Navigation', () => {
      beforeEach(() => {
        // set up components and get elements used in testing
        render(
          <Router>
            <UserNavbar />
          </Router>
        )

        joinBtn = screen.getByRole('button', { name: /join/i });
        logoutBtn = screen.getByRole('button', { name: /logout/i });
      })

      it("changes path when navigating to join page", () => {
        fireEvent.click(joinBtn);
        expect(window.location.pathname).toBe('/user/join')
      });

      it("changes path to authentication page after logging out", () => {
        fireEvent.click(logoutBtn);
        expect(window.location.pathname).toBe('/')
      });
    })

    describe('Renders UI elements correctly depending on current page', () => {
      // on Host page, Host button is disabled but rest of buttons are open
      it("host dashboard page", () => {
        render(<Router><UserNavbar tab="host"/></Router>)

        var hostBtn = screen.getByRole('button', { name: /host/i });
        expect(hostBtn).toBeDisabled()

        joinBtn = screen.getByRole('button', { name: /join/i });
        expect(joinBtn).not.toBeDisabled()
      });

      it("join game page", () => {
        render(<Router><UserNavbar tab="join"/></Router>)

        var hostBtn = screen.getByRole('button', { name: /host/i });
        expect(hostBtn).not.toBeDisabled()

        joinBtn = screen.getByRole('button', { name: /join/i });
        expect(joinBtn).toBeDisabled()
      });
    })
});
