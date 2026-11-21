"use client";
import { memo, useCallback, useMemo, useState, type Ref } from "react";
import dynamic from "next/dynamic";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";
const Calendar = dynamic(
  () => import("./calendar").then((module) => module.Calendar),
  {
    loading: () => (
      <p className="calendar-loading" role="status">
        Opening calendar…
      </p>
    ),
  },
);
export const DatePicker = memo(function DatePicker({
  id,
  label,
  value,
  onChange,
  error,
  onBlur,
  ref,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: () => void;
  ref?: Ref<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () => (value ? parseISO(value) : undefined),
    [value],
  );
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const isDisabled = useCallback(
    (day: Date) => format(day, "yyyy-MM-dd") < today,
    [today],
  );
  const selectDate = useCallback(
    (day: Date | undefined) => {
      onChange(day ? format(day, "yyyy-MM-dd") : "");
      setOpen(false);
    },
    [onChange],
  );
  const clearDate = useCallback(() => {
    onChange("");
    setOpen(false);
  }, [onChange]);
  return (
    <div className={"ui-field" + (error ? " ui-field-error" : "")}>
      <label htmlFor={id}>{label}</label>
      <Popover.Root open={open} onOpenChange={setOpen} modal>
        <Popover.Trigger
          ref={ref}
          id={id}
          onBlur={onBlur}
          className="ui-date-trigger"
          aria-invalid={!!error}
          aria-describedby={error ? id + "-error" : undefined}
        >
          <CalendarDays size={18} />
          <span>
            {selected ? format(selected, "dd MMM yyyy") : "Choose a date"}
          </span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={7}
            collisionPadding={12}
            className="ui-calendar-popover"
            aria-label="Choose preferred date"
          >
            <Calendar
              mode="single"
              selected={selected}
              defaultMonth={selected}
              disabled={isDisabled}
              onSelect={selectDate}
            />
            <button
              type="button"
              className="calendar-clear"
              onClick={clearDate}
            >
              Clear date
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {error && (
        <p id={id + "-error"} className="ui-field-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
