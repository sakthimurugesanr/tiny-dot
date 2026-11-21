import { z } from "zod";
import { serviceOptions } from "@/data/services";
export const commissionTypes = [
  "Vehicle Miniature",
  "Miniature House",
  "School / College Project",
  "Handcraft Work",
  "Other",
  ...serviceOptions,
] as const;
export const commissionBudgets = [
  "To be discussed",
  "Under ₹2,000",
  "₹2,000–₹5,000",
  "₹5,000–₹10,000",
  "₹10,000–₹25,000",
  "₹25,000+",
] as const;
export const commissionSchema = z.object({
  type: z.enum(commissionTypes, { error: "Choose a project type." }),
  concept: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters about your idea.")
    .max(4000),
  dimensions: z.string().trim().max(150),
  scale: z.string().trim().max(50),
  materials: z.string().trim().max(250),
  colors: z.string().trim().max(250),
  date: z
    .string()
    .max(20)
    .refine(
      (v) =>
        !v ||
        (/^\d{4}-\d{2}-\d{2}$/.test(v) &&
          v >= new Date().toISOString().slice(0, 10)),
      "Choose a future date.",
    ),
  budget: z.enum(commissionBudgets),
  references: z
    .string()
    .trim()
    .max(2000)
    .refine(
      (v) =>
        !v ||
        v
          .split("\n")
          .filter(Boolean)
          .every((u) => {
            try {
              return new URL(u.trim()).protocol === "https:";
            } catch {
              return false;
            }
          }),
      "Use one valid HTTPS reference link per line.",
    ),
  notes: z.string().trim().max(2000),
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(50),
  country: z.string().trim().min(2, "Enter your country.").max(100),
  delivery: z
    .string()
    .trim()
    .min(2, "Enter your city or delivery region.")
    .max(250),
  consent: z
    .boolean()
    .refine((v) => v, "Consent is required to send this request."),
  website: z.string().max(0),
});
export type CommissionInput = z.infer<typeof commissionSchema>;
