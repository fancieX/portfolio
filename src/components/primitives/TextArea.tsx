import { TextareaHTMLAttributes, forwardRef, useId } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// background:   #2A2926 (dark surface)
// border:       rgba(255, 255, 255, 0.12)
// focusBorder:  2px solid #D6FF3F (signature neon lime)
// text:         #FFFFFF (crisp white)
// placeholder:  rgba(255, 255, 255, 0.35)
// Source: docs/research/snapline/design-tokens.json & interaction-matrix.md

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Field label displayed above the textarea */
  label?: string;
  /** Optional validation error message */
  error?: string;
  /** Optional helper text displayed below the textarea */
  helperText?: string;
  /** Custom wrapper container class */
  containerClassName?: string;
}

/**
 * TextArea
 *
 * Multi-line dark form input primitive matching the Snapline Contact section styling
 * ("Project notes" field).
 *
 * Features:
 *   - Matte `#2A2926` background with `rgba(255, 255, 255, 0.12)` border
 *   - Signature neon lime focus border (`#D6FF3F`)
 *   - Native HTML5 validation compliance
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName = "",
      className = "",
      id,
      rows = 4,
      required,
      disabled,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className={["flex flex-col w-full", containerClassName].filter(Boolean).join(" ")}>
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block font-sans text-xs font-medium tracking-tight text-white/60 select-none"
          >
            {label}
            {required && <span className="ml-1 text-[#D6FF3F]">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          disabled={disabled}
          data-testid="text-area"
          className={[
            "w-full rounded-xl bg-[#2A2926] p-4 font-sans text-sm text-[#FFFFFF]",
            "border border-[rgba(255,255,255,0.12)]",
            "placeholder:text-white/35",
            "resize-y min-h-[120px]",
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

TextArea.displayName = "TextArea";
