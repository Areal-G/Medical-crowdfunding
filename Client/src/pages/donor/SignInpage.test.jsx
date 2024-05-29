/* eslint-disable no-undef */
import { test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { validatePassword } from "../../components/Common/Validation";

import SignInPage from "./SignInPage";

test("updates email input correctly", async () => {
  const { getByLabelText } = render(
    <Router>
      <SignInPage />
    </Router>,
  );
  const emailInput = getByLabelText("Email Address");
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  expect(emailInput.value).toBe("john@example.com");
});

test("validates a valid password", () => {
  const password = "Password123@";
  const result = validatePassword(password);
  expect(result).toBe(true);
});

test("validates an invalid password", () => {
  const password = "password";
  const result = validatePassword(password);
  expect(result).toBe(false);
});
