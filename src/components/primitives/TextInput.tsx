import { InputHTMLAttributes, forwardRef, useId } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// background:   #161616 (dark surface)
// border:       rgba(255, 255, 255, 0.12)
// focusBorder:  2px solid #D6FF3F (signature neon lime)
// text:         #FFFFFF (crisp white)
// placeholder:  rgba(255, 255, 255, 0.35)
// label:        rgba(255, 255, 255, 0.60), text-xs font-medium
// Source: docs/research/snapline/design-tokens.json & interaction-matrix.md

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label displayed above the input */
  label?: string;
  /** Optional validation error message */
  error?: string;
  /** Optional helper text displayed below the input */
  helperText?: string;
  /** Custom wrapper container class */
  containerClassName?: string;
}

/**
 * TextInput
 *
 * Dark form text input primitive matching the Snapline Contact section styling.
 *
 * Features:
 *   - Matte `#161616` background with `rgba(255, 255, 255, 0.12)` border
 *   - Signature neon lime focus border (`#D6FF3F`)
 *   - Native HTML5 validation compliance
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName = "",
      className = "",
      id,
      required,
      disabled,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={["flex flex-col w-full", containerClassName].filter(Boolean).join(" ")}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block font-sans text-xs font-medium tracking-tight text-white/60 select-none"
          >
            {label}
            {required && <span className="ml-1 text-[#D6FF3F]">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          data-testid="text-input"
          className={[
            "h-12 w-full rounded-xl bg-[#161616] px-4 font-sans text-sm text-[#FFFFFF]",
            "border border-[rgba(255,255,255,0.12)]",
            "placeholder:text-white/35",
            "transition-all duration-150 ease-out",
            "hover:border-white/25",
            "focus:outline-none focus:border-[#D6FF3F] focus:ring-1 focus:ring-[#D6FF3F]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "!border-[#FF3B5C] !focus:ring-[#FF3B5C]" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />

        {error ? (
          <p className="mt-1.5 text-xs text-[#FF3B5C]">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-white/40">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
