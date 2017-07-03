import {createFetchActions, createLocalActions, createAction, createFetchGetAction, createFetchPostAction, buildFindUrl, createSocketActions, createSocketAction} from './actionsHelpers.js'



var ifetch = require("isomorphic-fetch");
var BASE_URL = '';


export var {
  findCharacters,
  createCharacters,
  updateCharacters,
  destroyCharacters,
  clearCharacters,
  selectCharacters,
  syncCharacters,
  resetCharacters
} = createSocketActions('Characters');

export var {
  findMessages,
  createMessages,
  updateMessages,
  destroyMessages,
  clearMessages,
  selectMessages,
  syncMessages,
  receiveMessages,
  resetMessages
} = createSocketActions('Messages');

export var {
  findNotifications,
  createNotifications,
  updateNotifications,
  destroyNotifications,
  clearNotifications,
  selectNotifications,
  syncNotifications,
  receiveNotifications,
  resetNotifications
} = createSocketActions('Notifications');

export var {
  findLocations,
  createLocations,
  updateLocations,
  destroyLocations,
  clearLocations,
  selectLocations,
  syncLocations,
  receiveLocations,
  resetLocations
} = createSocketActions('Locations');

export var {
  findFriendships,
  createFriendships,
  updateFriendships,
  destroyFriendships,
  clearFriendships,
  selectFriendships,
  syncFriendships,
  receiveFriendships,
  resetFriendships
} = createSocketActions('Friendships');

export var {
  findChats,
  createChats,
  updateChats,
  destroyChats,
  clearChats,
  selectChats,
  syncChats,
  resetChats
} = createSocketActions('Chats');

export var {
  createUsers,
  updateUsers,
  destroyUsers,
  clearUsers,
  selectUsers,
  syncUsers,
  resetUsers
} = createLocalActions('Users');

export var {
  createComments,
  updateComments,
  destroyComments,
  clearComments,
  selectComments,
  syncComments,
  resetComments
} = createSocketActions('Comments');

export var {
  createProfiles,
  updateProfiles,
  destroyProfiles,
  clearProfiles,
  selectProfiles,
  syncProfiles,
  resetProfiles
} = createSocketActions('Profiles');


// WEB ACTIONS
export var pushUserData = createAction('PUSH_USER_DATA', 'data');
export var toggleForm = createAction('TOGGLE_FORM', 'status');
export var toggleModal = createAction('TOGGLE_MODAL', 'status');
export var setModalUI = createAction('SET_MODAL_UI', 'data');
export var closeAlert = createAction('CLOSE_ALERT');
export var closeModal = createAction('CLOSE_MODAL');
export var closeConfirm = createAction('CLOSE_CONFIRM');
export var hideModal = createAction('HIDE_MODAL');
export var openModal = createAction('OPEN_MODAL', 'modal');
export var showAlert = createAction('SHOW_ALERT', 'body');

//Phone actions
export var phoneOut = createAction('PHONE_OUT', 'out');
export var phoneScreen = createAction('PHONE_SCREEN', 'screen');
export var phoneConversation = createAction('PHONE_CONVERSATION', 'conversation');
export var phoneTitle = createAction('PHONE_TITLE', 'title');
export var phoneNavigation = (options) => {
  return {
    type: 'PHONE_NAVIGATION',
    screen: options.screen, 
    conversation: options.conversation, 
    title: options.title
  }
}

export var ioSwitchCharacters = createAction('IO_SWITCH_CHARACTERS', 'data');


export var showModal = (variant, title, text, button, callback) => {
  return {
    type: 'SHOW_MODAL',
    variant: variant || 'primary',
    title: title,
    text: text,
    button: button,
    callback: callback || null
  }
}

export var showConfirm = (body, callback) => {
  return {
    type: 'SHOW_CONFIRM',
    body: body,
    callback: callback || null
  }
}

// Custom Fetch Actions
export var selectRaceCharacters = createSocketAction('SELECT_RACE_CHARACTERS');
export var selectBreedCharacters = createSocketAction('SELECT_BREED_CHARACTERS');
export var selectAuspiceCharacters = createSocketAction('SELECT_AUSPICE_CHARACTERS');
export var selectClanCharacters = createSocketAction('SELECT_CLAN_CHARACTERS');
export var updatePointsCharacters = createSocketAction('UPDATE_POINTS_CHARACTERS');
export var setSkillPriorityCharacters = createSocketAction('SET_SKILL_PRIORITY_CHARACTERS');
export var switchCharacters = createSocketAction('SWITCH_CHARACTERS');
export var validateSheetCharacters = createSocketAction('VALIDATE_SHEET_CHARACTERS');

export var diceRollToChat = createSocketAction('DICE_ROLL_TO_CHAT');

export var readMessagesNotifications = createSocketAction('READ_MESSAGES_NOTIFICATIONS');
export var answerFriendships = createSocketAction('ANSWER_FRIENDSHIPS');


//Web FormData Upload
export var uploadSkus = (data, cb) => {
  return function (dispatch) {
    dispatch({
      type: 'WRITE_SKUS',
      data
    })
    return ifetch('/api/skus/upload', {
        credentials: 'same-origin',
        method: 'post',
        body: Object.assign(data)
      })
      .then(response => {
        return response.json()
      })
      .then(json => {
        if(json.err) dispatch({
          type: 'WRITE_FAILED_SKUS',
          error: json.err
        });
        else dispatch({
          type: 'WRITE_COMPLETED_SKUS',
          receivedAt: Date.now(),
          data: json
        });
        if(cb) cb(json.err, json);
        return;
      })
  }
}

