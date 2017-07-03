const fetchDefaults = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export default function buildFetchOptions(options, action, payload) {
  var fetchOptions = options.fetchOptions || fetchDefaults;
  if(action=='GET' || action=='FIND' || action=='SYNC') fetchOptions.method = 'GET';
  else if(action=='POST' || action=='CREATE') fetchOptions.method = 'POST';
  else if(action=='UPDATE') fetchOptions.method = 'PUT';
  else if(action=='DESTROY') fetchOptions.method = 'DELETE';
  else fetchOptions.method = 'POST';
  if(fetchOptions.method!='GET') fetchOptions.body = JSON.stringify(payload);
  return fetchOptions;
}
