export const parseServerMessage = res => {
  if (!res || !res.messages) return 'An unspecified error occured.';
  const error = Array.isArray(res.messages) ? res.messages[0] : res.messages;
  return typeof error === 'string' ? error : 'An unspecified error occured.';
};