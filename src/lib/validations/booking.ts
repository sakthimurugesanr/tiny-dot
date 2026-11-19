import { z } from "zod";
import { commissionTypes } from "@/lib/validations/commission";
export const bookingTimes = [
  "Any time",
  "Morning",
  "Afternoon",
  "Evening",
] as const;
export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number.")
    .max(25)
    .refine(
      (v) =>
        /^[+\d\s()-]+$/.test(v) &&
        v.replace(/\D/g, "").length >= 7 &&
        v.replace(/\D/g, "").length <= 15,
      "Enter a valid phone number.",
    ),
  email: z.union([
    z.literal(""),
    z.email("Enter a valid email address.").max(254),
  ]),
  service: z.enum(commissionTypes, { error: "Choose a service." }),
  date: z
    .string()
    .max(10)
    .refine(
      (value) =>
        !value ||
        (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
          !Number.isNaN(Date.parse(value)) &&
          new Date(value).toISOString().slice(0, 10) === value &&
          value >=
            new Intl.DateTimeFormat("en-CA", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date())),
      "Choose today or a future date.",
    ),
  time: z.enum(bookingTimes),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your idea (at least 10 characters).")
    .max(2000),
  consent: z
    .boolean()
    .refine(Boolean, "Please agree so we can contact you about this request."),
  website: z.string().max(0),
});
export type BookingInput = z.input<typeof bookingSchema>;
