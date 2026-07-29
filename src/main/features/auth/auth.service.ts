import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../../database/db";
import { users, type SafeUser } from "../../../database/schema/user.schema";

export const loginWithPassword = async (
  username: string,
  password: string,
): Promise<SafeUser> => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  const user = result[0];

  // I am throwing a generic error to prevent attackers from knowing if the username exists
  if (!user) throw new Error("Invalid username or password");

  // I must check if the password exists because regular employees only have a PIN
  if (!user.password) {
    throw new Error("This account uses a PIN to login, not a password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid username or password");

  // I am stripping out the secret hashes so they never reach the frontend screen
  const { password: _password, pin: _pin, ...safeUser } = user;

  return safeUser;
};

export const loginWithPin = async (
  userId: string,
  pin: string,
): Promise<SafeUser> => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = result[0];

  if (!user) throw new Error("User not found");

  const isPinValid = await bcrypt.compare(pin, user.pin);

  if (!isPinValid) throw new Error("Incorrect PIN");

  const { password: _password, pin: _pin, ...safeUser } = user;

  return safeUser;
};
