import { render, screen } from "@testing-library/react";
import Unit_test from "../components/Unit_test";
test("LoginTest", () => {
    render(<Unit_test />);
    expect(screen.queryByText(/Log In/)).toBeInTheDocument();
});
test("Checking Username and password are empty", () => {
    render(<Unit_test />);
    expect(screen.queryByPlaceholderText("username")).toHaveValue("");
    expect(screen.queryByPlaceholderText("password")).toHaveValue("");
});
