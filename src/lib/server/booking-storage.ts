import "server-only";
import { resolve, isAbsolute, sep, join } from "node:path";
export function bookingStorageDir() {
  if (process.env.VERCEL) return undefined;
  const configured = process.env.BOOKING_STORAGE_DIR;
  if (configured && !isAbsolute(configured)) return undefined;
  const directory = configured
    ? resolve(/* turbopackIgnore: true */ configured)
    : join(process.cwd(), "private-data", "bookings");
  const publicDirectory = resolve("public").toLowerCase();
  if (
    directory.toLowerCase() === publicDirectory ||
    directory.toLowerCase().startsWith(publicDirectory + sep)
  )
    return undefined;
  return directory;
}
