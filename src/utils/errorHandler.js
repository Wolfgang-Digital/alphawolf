export const parseServerMessage = message => {
  const error = Array.isArray(message) ? message[0] : message;
  return typeof error === 'string' ? error : 'An unspecified error occured.';
};