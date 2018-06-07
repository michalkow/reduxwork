import _ from 'lodash';

export function stripFields(config, data, prefix) {
  if (_.isArray(data))
    return data;
  if(!config) config = {};  
  var prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual',
  }

  return _.omitBy(data, (val, key) => _.startsWith(key, prefixes[prefix]));
}

export function parseFields(config, data, prefix) {
  if(!config) config = {};  
  var prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual',
  }

  return _.mapKeys(data, (val, key) => _.startsWith(key, prefixes[prefix]) ? _.lowerFirst(_.replace(key, prefixes[prefix], '')) : key);
}

export function stripVirtualFields(config, data) {
  return stripFields(config, data, 'virtual');
}

export function stripLocalFields(config, data) {
  return stripFields(config, data, 'local');
}

export function parseVirtualFields(config, data) {
  return parseFields(config, data, 'virtual');
}

export function parseLocalFields(config, data) {
  return parseFields(config, data, 'local');
}

export function stripVirtualParseLocalFields(config, data) {
  console.log('parseFields', parseFields(config, stripFields(config, data, 'virtual'), 'local'));
  return parseFields(config, stripFields(config, data, 'virtual'), 'local');
}