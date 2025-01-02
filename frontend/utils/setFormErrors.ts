export default function setFormErrors<T>(
  errors: Record<string, any>,
  setError: (
    field: keyof T | 'root.serverError',
    error: { type?: string; message?: string },
  ) => void,
) {
  Object.entries(errors).forEach(([key, value]) => {
    // Handle generic errors
    if (key === 'detail' || key === 'non_field_errors') {
      setError('root.serverError', {
        message: Array.isArray(value) ? value[0] : value,
      });
      return;
    }

    // Handle field-specific errors
    setError(key as keyof T, {
      type: 'manual',
      message: Array.isArray(value) ? value[0] : value,
    });
  });
}
