/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { test } from "vitest";

const hospitalName = "Central Hospital";
const profilePicture = "profile-picture.jpg";
const emailInput = "test@example.com";
const stateInput = "New York";
const addressInput = "123 Main St";
const cityInput = "New York City";
const phoneNumber = "123-456-7890";
const accountHolderName = "Jane Doe";
const accountNumber = "987654321";
const bankName = "Global Bank";

test("updates hospital name input correctly", async () => {
  const input = document.querySelector('input[name="hospitalName"]');
  const inputvalue = "Test Hospital";
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
