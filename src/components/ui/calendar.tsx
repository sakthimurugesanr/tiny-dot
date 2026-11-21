"use client";
import { DayPicker } from "react-day-picker";
import type { ComponentProps } from "react";
export function Calendar(props: ComponentProps<typeof DayPicker>) {
  return <DayPicker showOutsideDays className="studio-calendar" {...props} />;
}
