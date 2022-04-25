import { render } from "@testing-library/dom"
import SignIn from './Login'

describe("Login Component", () => {
  it("rendered input", () => {
    const { getByTestId } = render(<SignIn />);
    const input = getByTestId("username")
    expect(input).toBeTruthy();
  })
})