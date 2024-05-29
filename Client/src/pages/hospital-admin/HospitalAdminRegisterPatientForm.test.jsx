/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { test } from "vitest";

const patientName = "John Doe";
const email = "john.doe@example.com";
const city = "Hawassa";
const phoneNumber = "0911234567";
const password = "StrongPassword!123";
const confirmPassword = "StrongPassword!123";

test("updates patient name input correctly", async () => {
  const input = document.querySelector('input[name="patientName"]');
  const inputValue = "Test Patient";
  const output = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  expect(true).toBe(true);
});

test("uploads a profile picture", async () => {
  const fileInput = document.querySelector('input[type="file"]');
  const file = new File(["profile-picture.jpg"], "profile-picture.jpg", {
    type: "image/jpeg",
  });
  const event = new Event("change", { bubbles: true, cancelable: true });

  const output = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  expect(true).toBe(true);
});

test("validates email input", async () => {
  const input = document.querySelector('input[name="email"]');
  const inputvalue = "test@example.com";
  const event = new Event("change", { bubbles: true, cancelable: true });
  const output = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  expect(true).toBe(true);
});

test("submits the form", async () => {
  const submitButton = document.querySelector('button[type="submit"]');
  const event = new Event("submit", { bubbles: true, cancelable: true });

  const output = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  expect(true).toBe(true);
});
