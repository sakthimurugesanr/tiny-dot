"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, CircleCheck } from "lucide-react";
import { memo, type Ref } from "react";
export const FieldSelect = memo(function FieldSelect({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder = "Choose an option",
  error,
  required,
  name,
  onBlur,
  ref,
}: {
  id: string;
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  name?: string;
  onBlur?: () => void;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <div className={"ui-field" + (error ? " ui-field-error" : "")}>
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <SelectPrimitive.Root
        value={value || ""}
        onValueChange={onValueChange}
        name={name}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          onBlur={onBlur}
          className="ui-select-trigger"
          aria-invalid={!!error}
          aria-describedby={error ? id + "-error" : undefined}
          aria-required={required}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown size={17} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="ui-select-content"
            position="popper"
            sideOffset={6}
            collisionPadding={12}
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="ui-select-item"
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <CircleCheck size={16} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && (
        <p id={id + "-error"} className="ui-field-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
