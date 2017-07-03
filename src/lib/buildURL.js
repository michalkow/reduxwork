export default function buildURL(config, action, name, payload) {
  var id = null;
  var url = config.baseURL;
  if(payload.params && payload.params[config.idName]) id = payload.params[config.idName];
  if(config.customUrl) {
    url+= config.customUrl;
    for (var k in payload.params) {
      url = url.replace('%'+k, payload.params[k]);
    }
    if (payload.query) {
      let first = true;
      url += '/';
      for (var q in payload.query) {
        if(first) {
          url+= '?'+q+'='+payload.query[q];
          first = false;
        } else url+= '&'+q+'='+payload.query[q];
      }          
    }        
  } else {
    url+= id ? ('/'+name.toLowerCase()+'/'+action.toLowerCase()+'/'+id) : ('/'+name.toLowerCase()+'/'+action.toLowerCase());
    if (payload.query) {
      let first = true;
      url += '/';
      for (var q in payload.query) {
        if(first) {
          url+= '?'+q+'='+payload.query[q];
          first = false;
        } else url+= '&'+q+'='+payload.query[q];
      }          
    }  
  }
  return url;
}