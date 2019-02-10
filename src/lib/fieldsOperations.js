import {
  isArray,
  map,
  omitBy,
  startsWith,
  mapKeys,
  lowerFirst,
  replace
} from 'lodash';

export function stripFields(config = {}, data, prefix) {
  const prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual'
  };
  if (isArray(data))
    return map(data, (value) => omitBy(value, (val, key) => startsWith(key, prefixes[prefix])));

  return omitBy(data, (val, key) => startsWith(key, prefixes[prefix]));
}

export function parseFields(config = {}, data, prefix) {
  const prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual'
  };
  return mapKeys(data, (val, key) => startsWith(key, prefixes[prefix]) ? lowerFirst(replace(key, prefixes[prefix], '')) : key);
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
  return parseFields(config, stripFields(config, data, 'virtual'), 'local');
}