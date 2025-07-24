import { jwtDecode } from "jwt-decode";

export function isTokenValid(token: string): boolean {
  try {
    const rawToken = token.replace("Bearer ", "");
    const decoded = jwtDecode<{ exp: number }>(rawToken);

    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}
