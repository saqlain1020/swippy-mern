import { auth, serverTimestamp } from "../../Firebase/Firebase";
import { firestore } from "../../Firebase/Firebase";
import { SET_USER, UPDATE_USER } from "./userConstants";
import history from "src/Routes/history";
import { notify } from "reapop";
import store from "../store";
import { storage } from "./../../Firebase/Firebase";
import firebase from "src/Firebase/Firebase";
import sizeof from "firestore-size";
import { shapeUrl } from "src/Util/socialFunctions";
import { generateVCFUrl } from "./../../Util/socialFunctions";
import { apiCall } from "../../Util/api";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      user,
    },
  };
};

export const getTaggedUserData = async (username) => {
  try {
    let { data } = await apiCall.get("/profile/username/" + username);
    let { pic } = await apiCall.get("/profile/image/" + data._id);
    data.displayPhoto = pic;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserData = async (_id) => {
  try {
    let { data } = await apiCall.get("/profile/" + _id);
    let { pic } = await apiCall.get("/profile/image/" + _id);
    data.displayPhoto = pic;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signin = (email, password) => async (dispatch) => {
  try {
    let { data } = await apiCall.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    dispatch(setUser(data.user));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

const isUsernameExists = async (username) => {
  try {
    let { data } = await apiCall.get(
      "auth/check-username?username=" + username
    );
    return data.isAvailable;
  } catch (error) {
    throw error;
  }
};

export const signup = (username, email, password) => async (dispatch) => {
  try {
    if (await isUsernameExists(username)) {
      dispatch(notify("Username taken, try another username", "error"));
      return;
    }
    let { data } = await apiCall.post("/auth/signup", {
      username,
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    dispatch(setUser(data.user));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const authListener = () => async (dispatch) => {
  try {
    let { data } = await apiCall.get("/auth");
    console.log(data);
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setUser(null));
    dispatch(notify(error.message, "error"));
  }
};

export const signout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    history.push("/auth");
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const updateUserInfo = (obj) => async (dispatch) => {
  try {
    let { data } = await apiCall.patch("/profile", obj);
    dispatch(updateUser(data));
    dispatch(notify("Profile updated", "success"));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const getProfilePhoto = async (_id) => {
  try {
    let { pic } = await apiCall.get("/profile/image/" + _id);
    return pic;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadProfileImage = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("profile-image", file);
    await apiCall.post("/profile/image", formData, {
      headers: formData.getHeaders(),
    });
    let { pic } = await apiCall.get("/profile/image");
    dispatch(updateUser({ displayPhoto: pic }));
    dispatch(notify("Display Image updated", "success"));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const addSocial = (obj) => async (dispatch) => {
  try {
    let { url, title, icon, contactCard } = obj;
    if (contactCard && !url) url = generateVCFUrl(contactCard);
    else url = shapeUrl(icon, url);

    console.log(url);

    let dbObj = null;
    if (icon === "contactcard")
      dbObj = {
        url,
        contactCard,
        icon,
      };
    else
      dbObj = {
        title,
        url,
        icon,
      };
    console.log(dbObj);

    let { data } = await apiCall.post("/link", dbObj);

    //Update local state
    let arr = store.getState().user.socialLinks || [];
    arr.push(data);
    await dispatch(
      updateUser({
        socialLinks: arr,
      })
    );
    dispatch(notify("Social Link added...", "success"));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const updateSocials = (obj, index) => async (dispatch) => {
  try {
    let arr = store.getState().user.socialLinks;
    console.log(obj, index);
    arr = arr.map((item, ind) => {
      if (ind === index) {
        return {
          ...item,
          ...obj,
        };
      }
      return item;
    });
    await firestore
      .collection("users")
      .doc(store.getState().user.uid)
      .update({ socialLinks: arr });

    dispatch(updateUser({ socialLinks: arr }));
    dispatch(notify("Social Link updated...", "success"));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const deleteSocial = (index) => async (dispatch) => {
  try {
    let arr = store.getState().user.socialLinks;
    arr = arr.filter((item, ind) => ind !== index);
    await firestore
      .collection("users")
      .doc(store.getState().user.uid)
      .update({ socialLinks: arr });

    dispatch(updateUser({ socialLinks: arr }));
    dispatch(notify("Social Link deleted...", "success"));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const changeDirect = () => async (dispatch) => {
  try {
    let direct = store.getState().user.direct || false;
    direct = !direct;
    await firestore
      .collection("users")
      .doc(store.getState().user.uid)
      .update({ direct });
    dispatch(updateUser({ direct }));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const sendPasswordResetEmail = (email) => async (dispatch) => {
  try {
    await auth.sendPasswordResetEmail(email);
    dispatch(notify("Password reset email sent..", "success"));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const changePrimary = (index) => async (dispatch) => {
  try {
    let arr = store.getState().user.socialLinks;
    arr = arr.map((item, ind) => {
      if (ind === index) item.isPrimary = true;
      else item.isPrimary = false;
      return item;
    });
    await firestore
      .collection("users")
      .doc(store.getState().user.uid)
      .update({ socialLinks: arr });

    dispatch(updateUser({ socialLinks: arr }));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

export const deleteTag = (serial) => async (dispatch) => {
  try {
    let arr = store.getState().user.tags;
    arr = arr.filter((item) => item !== serial);
    await firestore
      .collection("users")
      .doc(store.getState().user.uid)
      .update({ tags: arr });

    dispatch(updateUser({ tags: arr }));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};
