export default function getFetchMethod(config, action) {
  if (config.fetchMethod) return config.fetchMethod;
  else if (config.fetchOptions && config.fetchOptions.method) return config.fetchOptions.method;
  else if (action == 'GET' || action == 'FIND' || action == 'SYNC') return 'GET';
  else if (action == 'POST' || action == 'CREATE') return 'POST';
  else if (action == 'UPDATE') return 'PUT';
  else if (action == 'DESTROY') return 'DELETE';
  else return 'POST';
}