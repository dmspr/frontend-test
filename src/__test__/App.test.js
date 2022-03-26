import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test('renders "React Axios example"', () => {
  render(<App />);
  const linkElement = screen.getByText(/react axios example/i);
  expect(linkElement).toBeInTheDocument();
});