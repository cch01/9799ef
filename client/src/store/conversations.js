import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  setReadMessageToStore,
} from './utils/reducerFunctions';

// ACTIONS

const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_MESSAGES_READ = 'SET_MESSAGES_READ';
const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
const REMOVE_OFFLINE_USER = 'REMOVE_OFFLINE_USER';
const SET_SEARCHED_USERS = 'SET_SEARCHED_USERS';
const CLEAR_SEARCHED_USERS = 'CLEAR_SEARCHED_USERS';
const ADD_CONVERSATION = 'ADD_CONVERSATION';

// ACTION CREATORS

export const gotConversations = (conversations) => ({
  type: GET_CONVERSATIONS,
  conversations,
});

export const setNewMessage = (message, sender) => ({
  type: SET_MESSAGE,
  payload: { message, sender: sender || null },
});

export const setMessagesRead = (updatedMessageIds, conversationId) => ({
  type: SET_MESSAGES_READ,
  payload: { updatedMessageIds, conversationId },
});

export const addOnlineUser = (id) => ({
  type: ADD_ONLINE_USER,
  id,
});

export const removeOfflineUser = (id) => ({
  type: REMOVE_OFFLINE_USER,
  id,
});

export const setSearchedUsers = (users) => ({
  type: SET_SEARCHED_USERS,
  users,
});

export const clearSearchedUsers = () => ({
  type: CLEAR_SEARCHED_USERS,
});

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => ({
  type: ADD_CONVERSATION,
  payload: { recipientId, newMessage },
});

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case SET_MESSAGES_READ:
      return setReadMessageToStore(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
