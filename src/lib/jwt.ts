import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode("supersecretkey123"); // mock secret key

export async function generateJWT(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}
