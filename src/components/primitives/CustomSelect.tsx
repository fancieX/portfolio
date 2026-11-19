"use client";

import {
  forwardRef,
  useId,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// background:   #161616 (dark surface)
// border:       rgba(255, 255, 255, 0.12)
// focusBorder:  2px solid #D6FF3F (signature neon lime)
// text:         #FFFFFF (crisp white)
// placeholder:  rgba(255, 255, 255, 0.35)
// options bg:   #161616
// option hover: rgba(255, 255, 255, 0.08)
// Source: docs/research/snapline/design-tokens.json & interaction-matrix.md

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  /** Field label displayed above the select */
  label?: string;
  /** Selectable options array (either objects or string literals) */
  options: (SelectOption | string)[];
  /** Controlled value */
  value?: string;
  /** Initial uncontrolled value */
  defaultValue?: string;
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** Change callback */
  onChange?: (value: string) => void;
  /** Form field name for native form submission */
  name?: string;
  /** Whether selection is mandatory */
  required?: boolean;
  /** Whether control is disabled */
  disabled?: boolean;
  /** Custom wrapper container class */
  containerClassName?: string;
  /** Custom trigger button class */
  className?: string;
  /** Optional validation error message */
  error?: string;
  /** Field ID */
  id?: string;
}

/**
 * CustomSelect
 *
 * Dark custom dropdown primitive matching Snapline's Contact comboboxes
 * ("Service needed", "Budget", "Timeline").
 *
 * Features:
 *   - Matte `#161616` background with `rgba(255, 255, 255, 0.12)` border
 *   - Glowing neon lime focus indicator (`#D6FF3F`)
 *   - Synced hidden native select for seamless HTML5 form serialization
 *   - Accessible keyboard support (Enter, Space, Escape, Arrows)
 */
export const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
  (
    {
      label,
      options,
      value: controlledValue,
      defaultValue,
      placeholder = "Select an option",
      onChange,
      name,
      required,
      disabled,
      containerClassName = "",
      className = "",
      error,
      id,
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    // Normalize options into { value, label } format
    const normalizedOptions: SelectOption[] = options.map((opt) =>
      typeof opt === "string" ? { value: opt, label: opt } : opt
    );

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string>(
      controlledValue ?? defaultValue ?? ""
    );

    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : internalValue;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const nativeSelectRef = useRef<HTMLSelectElement>(null);

    // Selected option metadata
    const selectedOption = normalizedOptions.find((opt) => opt.value === activeValue);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (val: string) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      onChange?.(val);
      setIsOpen(false);

      // Trigger change on hidden select for form integration
      if (nativeSelectRef.current) {
        nativeSelectRef.current.value = val;
        nativeSelectRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = normalizedOptions.findIndex(
            (opt) => opt.value === activeValue
          );
          const nextIndex = Math.min(
            currentIndex + 1,
            normalizedOptions.length - 1
          );
          handleSelect(normalizedOptions[nextIndex].value);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (isOpen) {
          const currentIndex = normalizedOptions.findIndex(
            (opt) => opt.value === activeValue
          );
          const prevIndex = Math.max(currentIndex - 1, 0);
          handleSelect(normalizedOptions[prevIndex].value);
        }
      }
    };

    return (
      <div
        ref={dropdownRef}
        className={["relative flex flex-col w-full", containerClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block font-sans text-xs font-medium tracking-tight text-white/60 select-none"
          >
            {label}
            {required && <span className="ml-1 text-[#D6FF3F]">*</span>}
          </label>
        )}

        {/* Custom Trigger Button */}
        <button
          ref={ref}
          id={selectId}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          data-testid="custom-select-trigger"
          className={[
            "h-12 w-full rounded-xl bg-[#161616] px-4 font-sans text-sm text-left select-none cursor-pointer",
            "border border-[rgba(255,255,255,0.12)]",
            "inline-flex items-center justify-between gap-3",
            "transition-all duration-150 ease-out",
            "hover:border-white/25",
            isOpen
              ? "border-[#D6FF3F] ring-1 ring-[#D6FF3F]"
              : "focus:outline-none focus:border-[#D6FF3F] focus:ring-1 focus:ring-[#D6FF3F]",
            disabled ? "cursor-not-allowed opacity-50" : "",
            error ? "!border-[#FF3B5C] !focus:ring-[#FF3B5C]" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span
            className={
              selectedOption ? "text-[#FFFFFF]" : "text-white/35 font-normal"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          {/* Chevron Icon */}
          <span
            data-testid="custom-select-chevron"
            className={[
              "shrink-0 text-white/50 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0",
            ].join(" ")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 stroke-current stroke-[2]"
            >
              <path
                d="M4 6L8 10L12 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul
            role="listbox"
            data-testid="custom-select-dropdown"
            className="absolute top-[calc(100%+6px)] left-0 z-50 w-full rounded-xl border border-[rgba(255,255,255,0.14)] bg-[#161616] py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-md max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === activeValue;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={[
                    "px-4 py-2.5 font-sans text-sm cursor-pointer select-none transition-colors duration-100",
                    isSelected
                      ? "bg-white/10 text-[#D6FF3F] font-semibold"
                      : "text-white/80 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="text-[#D6FF3F] text-xs">✓</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Hidden native select for HTML5 form submission */}
        <select
          ref={nativeSelectRef}
          name={name}
          value={activeValue}
          required={required}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {normalizedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && <p className="mt-1.5 text-xs text-[#FF3B5C]">{error}</p>}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
