import { ActionOperationEnum, FetchMethodEnum } from '../lib/constants';

const operationFeatchMethod = {
  [ActionOperationEnum.POST]: FetchMethodEnum.POST,
  [ActionOperationEnum.CREATE]: FetchMethodEnum.POST,
  [ActionOperationEnum.GET]: FetchMethodEnum.GET,
  [ActionOperationEnum.FIND]: FetchMethodEnum.GET,
  [ActionOperationEnum.SYNC]: FetchMethodEnum.GET,
  [ActionOperationEnum.PUT]: FetchMethodEnum.PUT,
  [ActionOperationEnum.UPDATE]: FetchMethodEnum.PUT,
  [ActionOperationEnum.DELETE]: FetchMethodEnum.DELETE,
  [ActionOperationEnum.DESTROY]: FetchMethodEnum.DESTROY
};

export default function getFetchMethod(action, options = {}) {
  if (options.fetchMethod)
    return options.fetchMethod;

  let { operation } = action.meta;

  if (operationFeatchMethod[operation])
    return operationFeatchMethod[operation];

  return FetchMethodEnum.POST;
}