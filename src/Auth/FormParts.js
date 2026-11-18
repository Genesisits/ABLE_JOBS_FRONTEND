import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  DialogTitle,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./forms.css";

/* True on phones – registration dialogs go full screen there. */
export const useIsMobile = () => useMediaQuery("(max-width:600px)");

/* Dialog title bar with a close (X) button in the top-right corner. */
export function RegDialogTitle({ children, onClose }) {
  return (
    <DialogTitle className="reg-title">
      <span className="reg-title-text">{children}</span>
      <IconButton
        aria-label="Close registration form"
        className="reg-close"
        onClick={onClose}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

/*
 * Text field.  The caption in `hint` is shown BELOW the input (as the
 * field's label). When there is a validation error, the error replaces it.
 */
export function RegField({ hint, error, ...props }) {
  return (
    <TextField
      fullWidth
      className="custom-input reg-field"
      error={!!error}
      helperText={error || hint}
      FormHelperTextProps={{ className: error ? "reg-hint reg-hint-error" : "reg-hint" }}
      {...props}
    />
  );
}

/* Drop-down (MUI select) with its label below. */
export function RegSelect({ hint, error, children, ...props }) {
  return (
    <RegField select hint={hint} error={error} {...props}>
      {children}
    </RegField>
  );
}

/* Password field with show / hide toggle that stays inside the input. */
export function RegPassword({ hint, error, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <RegField
      hint={hint}
      error={error}
      type={show ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow((s) => !s)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
              size="small"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

/* File picker with its label below. */
export function RegFile({ hint, error, ...props }) {
  return (
    <RegField
      type="file"
      className="custom-input reg-field reg-file"
      InputLabelProps={{ shrink: true }}
      hint={hint}
      error={error}
      {...props}
    />
  );
}

/* Small caption below a native <input>/<select>/<DatePicker> (Employee wizard). */
export function Hint({ children, error }) {
  if (!children) return null;
  return <div className={error ? "reg-hint reg-hint-error" : "reg-hint"}>{children}</div>;
}
