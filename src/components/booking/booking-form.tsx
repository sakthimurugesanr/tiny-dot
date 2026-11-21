"use client";
import { MaterialProvider } from "@/components/booking/material-provider";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldSelect } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import {
  bookingSchema,
  bookingTimes,
  type BookingInput,
} from "@/lib/validations/booking";
import { commissionTypes } from "@/lib/validations/commission";
import { site } from "@/config/site";
const bookingServiceOptions = commissionTypes.map((value) => ({
  value,
  label: value,
}));
const bookingTimeOptions = bookingTimes.map((value) => ({
  value,
  label: value,
}));
function BookingFields({
  service,
  project,
  available = true,
  onDone,
}: {
  service?: string;
  project?: string;
  available?: boolean;
  onDone?: () => void;
}) {
  const prefix = useId();
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: commissionTypes.find((t) => t === service),
      date: "",
      time: "Any time",
      message: project
        ? `I would like to discuss a model inspired by ${project}.`
        : "",
      consent: false,
      website: "",
    },
  });
  const input = (name: keyof BookingInput) => {
    const { ref, ...props } = register(name);
    return { ...props, inputRef: ref };
  };
  const { ref: consentRef, ...consentProps } = register("consent");
  const submit = handleSubmit(async (values) => {
    setError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok || !data.id)
        throw new Error(
          data.error || "Your request could not be saved. Please try again.",
        );
      setReceipt(data.id);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Connection failed. Your details remain in the form.",
      );
    }
  });
  if (receipt)
    return (
      <div className="booking-success" role="status">
        <span className="success-icon">
          <CheckCircle2 size={32} />
        </span>
        <span className="eyebrow">Request received</span>
        <h3>Let’s make something special.</h3>
        <p>
          Your booking request has been saved for review. Your preferred date
          and time will be confirmed directly by Tiny Dot’s.
        </p>
        <small>Reference: {receipt}</small>
        <a className="button button-outline" href={site.phoneHref}>
          <Phone size={16} />
          Call {site.phone}
        </a>
        {onDone && (
          <Button className="button" onClick={onDone}>
            Close
          </Button>
        )}
      </div>
    );
  const common = (name: keyof BookingInput) => ({
    id: `${prefix}-${name}`,
    error: !!errors[name],
    helperText: errors[name]?.message,
  });
  return (
    <form className="simple-booking-form" onSubmit={submit} noValidate>
      <div className="booking-input-grid">
        <TextField
          label="Your name"
          autoComplete="name"
          required
          {...common("name")}
          {...input("name")}
        />
        <TextField
          label="Phone number"
          type="tel"
          autoComplete="tel"
          required
          {...common("phone")}
          {...input("phone")}
        />
        <TextField
          label="Email (optional)"
          type="email"
          autoComplete="email"
          className="booking-wide"
          {...common("email")}
          {...input("email")}
        />
        <div className="booking-wide">
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <FieldSelect
                {...field}
                id={`${prefix}-service`}
                label="What would you like made?"
                required
                onValueChange={field.onChange}
                options={bookingServiceOptions}
                error={errors.service?.message}
              />
            )}
          />
        </div>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              id={`${prefix}-date`}
              label="Preferred date (optional)"
              error={errors.date?.message}
            />
          )}
        />
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <FieldSelect
              {...field}
              id={`${prefix}-time`}
              label="Best time to call"
              onValueChange={field.onChange}
              options={bookingTimeOptions}
              error={errors.time?.message}
            />
          )}
        />
        <TextField
          label="A little about your idea"
          placeholder="Model, size, special details or the occasion…"
          multiline
          minRows={3}
          required
          className="booking-wide"
          {...common("message")}
          {...input("message")}
        />
      </div>
      <div className="booking-honeypot" aria-hidden="true">
        <TextField
          label="Website"
          tabIndex={-1}
          slotProps={{ htmlInput: { tabIndex: -1 } }}
          autoComplete="off"
          {...input("website")}
        />
      </div>
      <FormControlLabel
        className="booking-consent"
        control={
          <Checkbox
            size="small"
            {...consentProps}
            slotProps={{ input: { ref: consentRef } }}
          />
        }
        label="I agree to be contacted about this booking request."
      />
      {errors.consent && (
        <p className="booking-error" role="alert">
          {errors.consent.message}
        </p>
      )}
      {error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      {!available && (
        <Alert severity="info">
          Online requests are unavailable. Please call {site.phone} to discuss
          your idea.
        </Alert>
      )}
      <Button
        className="button booking-submit"
        type="submit"
        disabled={isSubmitting || !available}
      >
        {isSubmitting ? "Sending your request…" : "Send booking request"}
      </Button>
      <p className="booking-footnote">
        A request starts a conversation. Dates, pricing and delivery are
        confirmed directly. No payment is taken.
      </p>
    </form>
  );
}

export function BookingForm(props: Parameters<typeof BookingFields>[0]) {
  return (
    <MaterialProvider>
      <BookingFields {...props} />
    </MaterialProvider>
  );
}
