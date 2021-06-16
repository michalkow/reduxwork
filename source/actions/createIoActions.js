import { buildAction, buildActionType } from './buildAction';
import { ActionOperationEnum } from '../lib/constants';

export default function createIoActions(name, options) {
  return {
    [`clear${name}`]() {
      return {
        type: buildActionType(options, ActionOperationEnum.CLEAR, name)
      };
    },
    [`reset${name}`]() {
      return {
        type: buildActionType(options, ActionOperationEnum.RESET, name)
      };
    },
    [`select${name}`](data) {
      return {
        type: buildActionType(options, ActionOperationEnum.SELECT, name),
        data
      };
    },
    [`receive${name}`](data) {
      return {
        type: buildActionType(options, ActionOperationEnum.RECEIVE, name),
        data
      };
    },
    [`remove${name}`](data) {
      return {
        type: buildActionType(options, ActionOperationEnum.REMOVE, name),
        data
      };
    },
    [`find${name}`](data = []) {
      return buildAction(
        options,
        ActionOperationEnum.FIND,
        name,
        data
      );
    },
    [`sync${name}`](data = []) {
      return buildAction(
        options,
        ActionOperationEnum.SYNC,
        name,
        data
      );

    },
    [`create${name}`](data = []) {
      return buildAction(
        options,
        ActionOperationEnum.CREATE,
        name,
        data
      );
    },
    [`update${name}`](data = []) {
      return buildAction(
        options,
        ActionOperationEnum.UPDATE,
        name,
        data
      );
    },
    [`destroy${name}`](data = []) {
      return buildAction(
        options,
        ActionOperationEnum.DESTROY,
        name,
        data
      );
    }
  };
}