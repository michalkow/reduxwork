import { buildAction } from './buildAction';
import { ActionOperationEnum } from '../lib/constants';

export const createGetAction = (name, options) =>
  (data) => {
    return buildAction(
      options,
      ActionOperationEnum.GET,
      name,
      data,
      name
    );
  };

export const createPostAction = (name, options) =>
  (data) => {
    return buildAction(
      options,
      ActionOperationEnum.POST,
      name,
      data,
      name
    );
  };

export const createPutAction = (name, options) =>
  (data) => {
    return buildAction(
      options,
      ActionOperationEnum.PUT,
      name,
      data,
      name
    );
  };

export const createDeleteAction = (name, options) =>
  (data) => {
    return buildAction(
      options,
      ActionOperationEnum.DELETE,
      name,
      data,
      name
    );
  };