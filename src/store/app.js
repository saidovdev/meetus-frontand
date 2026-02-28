import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "../features/auth.features/check.auth.js";
import userSignupSlice from "../features/auth.features/signup.user.js";
import loginSlice from "../features/auth.features/login.user.js";
import completeSlice from "../features/auth.features/complete.user.auth.js";

import navigatorSlice from "../features/navigator.features/navigator.js";

import profileRenameSlice from "../features/profile.features/rename.user.profile.js";
import contactSlice from "../features/profile.features/user.contact.js";

import projectSlice from "../features/post.feautures/post.project.js";
import getPostSlice from "../features/post.feautures/get.post.js";
import postDetails from "../features/post.feautures/post.details.js";

import searchSlice from "../features/search.feauture/search.js";

import collaboratorNotificationSlice from "../features/notification.features/post.notifictaion/collaborator.notication.js";
import onlineUsersSlice from "../features/notification.features/post.notifictaion/online.user.js";
import collaboratorPostSlice from "../features/notification.features/post.notifictaion/collaborator.accept.js";
import getNotification from '../features/notification.features/post.notifictaion/get.notification.js'


import updatePostSlice from '../features/post.feautures/update.post.js'
const rootReducer = combineReducers({
  user: userSlice,
  auth: userSignupSlice,
  login: loginSlice,
  complete: completeSlice,

  navigator: navigatorSlice,

  profileRename: profileRenameSlice,
  contact: contactSlice,

  project: projectSlice,
  getpost: getPostSlice,
  postDetails: postDetails,

  search: searchSlice,

  collaborator: collaboratorNotificationSlice,
  onlineUsers: onlineUsersSlice,
  collaboratorPost: collaboratorPostSlice,
  notification:getNotification,
  updatePost:updatePostSlice
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,

  blacklist: [
    "onlineUsers",
    "collaboratorPost",
    "postDetails",
    "collaborator",
    "project",
    "getpost",
    "search",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
