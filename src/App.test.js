import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the skill strength advisor", () => {
  render(<App />);
  expect(screen.getByText(/Skill Strength Advisor/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Engineering domain/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/CV or skillset text/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/Upload CV file/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("radio", { name: /CV file/i }));
  expect(screen.getByLabelText(/Upload CV file/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/CV or skillset text/i)).not.toBeInTheDocument();
});
