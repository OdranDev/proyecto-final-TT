export function validateProductPayload(payload) {
  const errors = [];
  if (!payload) {
    errors.push('Payload is required');
  } else {
    if (payload.name == null || String(payload.name).trim() === '') {
      errors.push('name is required');
    }
    if (payload.price == null || isNaN(Number(payload.price))) {
      errors.push('price is required and must be a number');
    }
    // otros campos : description, category, stock si los tenemos en firebase
  }
  if (errors.length) {
    const err = new Error(errors.join(', '));
    err.name = 'ValidationError';
    throw err;
  }
  return true;
}
