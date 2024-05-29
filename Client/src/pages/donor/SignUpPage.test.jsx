/* eslint-disable no-undef */
import { test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  validatePassword,
  validatePhoneNumber,
} from "../../components/Common/Validation";
import SignUpPage from "./SignUpPage";

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

test("validates a valid phone number", () => {
  const phoneNumber = "0912345678";
  const result = validatePhoneNumber(phoneNumber);
  expect(result).toBe(true);
});

test("validates an invalid phone number", () => {
  const phoneNumber = "0123456789";
  const result = validatePhoneNumber(phoneNumber);
  expect(result).toBe(false);
});

test("updates full name input correctly", async () => {
  const { getByLabelText } = render(
    <Router>
      <SignUpPage />
    </Router>,
  );
  const fullNameInput = getByLabelText("Full Name");
  fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
  expect(fullNameInput.value).toBe("John Doe");
});

test("updates email input correctly", async () => {
  const { getByLabelText } = render(
    <Router>
      <SignUpPage />
    </Router>,
  );
  const emailInput = getByLabelText("Email Address");
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  expect(emailInput.value).toBe("john@example.com");
});

test("updates country input correctly", async () => {
  const { getByLabelText } = render(
    <Router>
      <SignUpPage />
    </Router>,
  );
  const countryInput = getByLabelText("Country");
  fireEvent.change(countryInput, { target: { value: "United States" } });
  expect(countryInput.value).toBe("United States");
});
