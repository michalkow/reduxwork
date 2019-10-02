export default (options) => (error, action, retries) => {
  const { request, response } = error;
  if (!request) throw error; // There was an error creating the request
  if (!response) return false; // There was no response
  return 400 <= response.status && response.status < 500;
};