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
    let data = {};
    let query = await firestore
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get();
    query.forEach((doc) => {
      data = doc.data();
    });
    let displayPhoto = await getProfilePhoto(data.uid);
    console.log(sizeof(data));
    data.displayPhoto = displayPhoto;
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
    console.log(data);
    localStorage.setItem("token", data.token);
    dispatch(setUser(data.user));
  } catch (error) {
    dispatch(notify(error.message, "error"));
  }
};

const isUsernameExists = async (username) => {
  let query = await firestore
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get();
  let flag = false;
  //True if user exists and false if not
  query.forEach((doc) => {
    if (doc.exists) flag = true;
  });
  return flag;
};

export const signup = (username, email, pass) => async (dispatch) => {
  try {
    if (await isUsernameExists(username)) {
      throw { message: "Username taken, try another username" };
    }
    let user = await auth.createUserWithEmailAndPassword(email, pass);
    let {
      user: { uid },
    } = user;
    let obj = {
      uid,
      email,
      username,
      name: username,
      scanCount: 0,
      createdAt: serverTimestamp,
    };
    await firestore.collection("users").doc(uid).set(obj);
    dispatch(setUser(await getUserData(uid)));
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

export const getProfilePhoto = async (uid) => {
  try {
    let ref = storage.child(`/users/images/${uid}.png`);
    let url = await ref.getDownloadURL();
    return url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadProfileImage = (file) => async (dispatch) => {
  try {
    let ref = storage.child(`/users/images/${store.getState().user.uid}.png`);
    await ref.put(file);
    let url = await ref.getDownloadURL();
    dispatch(updateUser({ displayPhoto: url }));
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
    await firestore
      .collection("users")
      .doc(store.getState().user.uid)
      .update({
        socialLinks: firebase.firestore.FieldValue.arrayUnion(dbObj),
      });
    //Update local state
    let arr = store.getState().user.socialLinks || [];
    arr.push(dbObj);
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
