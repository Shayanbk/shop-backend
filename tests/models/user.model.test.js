import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../src/models/usermodel";
const TEST_DB = "mongodb://127.0.0.1:27017/test-shop-backend";
const baseUser = {
  name: "Test User",
  password: "12345678",
  confirmpassword: "12345678",
};
const createUser = (overrides = {}) =>
  new User({
    ...baseUser,
    email: `user_${Date.now()}@test.com`,
    ...overrides,
  });
beforeAll(async () => {
  await mongoose.connect(TEST_DB);
});
afterAll(async () => {
  await mongoose.connection.close();
});
beforeEach(async () => {
  await User.deleteMany();
});
describe("User pre-save hook (password hashing)", () => {
  it("hashes password before save", async () => {
    const user = createUser();
    const plainPassword = user.password;

    await user.save();

    expect(user.password).not.toBe(plainPassword);
    expect(await bcrypt.compare(plainPassword, user.password)).toBe(true);
    expect(user.confirmpassword).toBeUndefined();
  });
  it("does not re-hash password if it was not modified", async () => {
    const user = createUser();

    await user.save();
    const firstHash = user.password;

    user.name = "Updated Name";
    await user.save({ validateBeforeSave: false });

    expect(user.password).toBe(firstHash);
  });
});
