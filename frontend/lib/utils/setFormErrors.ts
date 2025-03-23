/**
 * Sets form validation errors by calling the provided `setError` function for each error.
 * Handles both field-specific errors and non-field (generic) errors.
 *
 * @param errors - An object containing error details, where keys are field names or special error keys (e.g., 'detail').
 * @param setError - A function to set the error for a specific field or a special error (e.g., 'root.serverError').
 */
export function setFormErrors<T>(
  errors: Record<string, any>,
  setError: (
    field: keyof T | 'root.serverError', // Field or special error key
    error: { type?: string; message?: string }
  ) => void
) {
  Object.entries(errors).forEach(([key, value]) => {
    // Handle generic errors (non-field errors)
    if (key === 'detail' || key === 'non_field_errors') {
      setError('root.serverError', {
        message: Array.isArray(value) ? value[0] : value,
      });
      return;
    }

    // Handle field-specific errors (map to respective field)
    setError(key as keyof T, {
      type: 'manual',
      message: Array.isArray(value) ? value[0] : value,
    });
  });
}
