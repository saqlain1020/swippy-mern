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
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
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
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const authListener = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      let { data } = await apiCall.get("/auth");
      console.log(data);
      dispatch(setUser(data));
    }
  } catch (error) {
    dispatch(setUser(null));
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const signout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    window.location = "/auth";
    // history.push("/auth");
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const updateUserInfo = (obj) => async (dispatch) => {
  try {
    let { data } = await apiCall.patch("/profile", obj);
    dispatch(updateUser(data));
    dispatch(notify("Profile updated", "success"));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
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
    console.log(file);
    const formData = new FormData();
    formData.append("profile-image", file);
    formData.append("profile", "asfg");
    console.log(formData);
    let { data: url } = await apiCall.post("/profile/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(updateUser({ displayPhoto: url }));
    dispatch(notify("Display Image updated", "success"));
    window.location.reload(false);
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
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
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const updateSocials = (obj) => async (dispatch) => {
  try {
    console.log(obj);
    let link = await apiCall.patch("/link/" + obj._id, obj);
    let arr = store.getState().user.socialLinks;
    arr = arr.map((item) => {
      if (obj._id === item._id) {
        return {
          ...item,
          ...link,
        };
      }
      return item;
    });
    dispatch(updateUser({ socialLinks: arr }));
    dispatch(notify("Social Link updated...", "success"));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const deleteSocial = (_id) => async (dispatch) => {
  try {
    let link = await apiCall.delete("/link/" + _id);
    let arr = store.getState().user.socialLinks;
    arr = arr.filter((item) => item._id !== link.data._id);
    console.log(arr,link);
    dispatch(updateUser({ socialLinks: arr }));
    dispatch(notify("Social Link deleted...", "success"));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const changeDirect = () => async (dispatch) => {
  try {
    let { data } = await apiCall.patch("/profile/toggle-direct");
    dispatch(setUser(data));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const sendPasswordResetEmail = (email) => async (dispatch) => {
  try {
    let { data } = await apiCall.get("/auth/forgot-password?email=" + email);
    dispatch(notify("Password reset email sent..", "success"));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const changePrimary = (_id) => async (dispatch) => {
  try {
    let { data } = await apiCall.patch("/link/make-primary/" + _id);
    dispatch(setUser(data));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

export const deleteTag = (serial) => async (dispatch) => {
  try {
    let { data } = await apiCall.delete("/profile/tag/" + serial);
    dispatch(setUser(data));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};


export const changePasswordUsingToken = ({ password, confirmPassword, resetToken }) => async (dispatch) => {
  try {
    if (password !== confirmPassword) {
      dispatch(notify("Password not matching..", "error"));
      return;
    }
    await apiCall.post(`/auth/reset-password/${resetToken}`, { password, confirmPassword })
    dispatch(notify("Password Changed.. Now you can login", "success"));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};
