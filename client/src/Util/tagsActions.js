import firebase, { firestore } from "src/Firebase/Firebase";
import { notify } from "reapop";
import store from "src/Redux/store";
import { updateUser, setUser } from "src/Redux/user/userActions";
import { apiCall } from "./api";

export const fetchTagUser = (tagSerial) => async (dispatch) => {
  try {
    let { data: user } = await apiCall.get("/profile/scanned/"+ tagSerial);
    console.log(user);
    return user;
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    // dispatch(notify(errorMessage, "error"));
    return null
  }
};

export const pairTag = (serial) => async (dispatch) => {
  try {
    let { data: user } = await apiCall.post("/profile/tag/" + serial);

    dispatch(setUser(user));
    dispatch(notify("Tag successfully paired", "success"));
  } catch (error) {
    let errorMessage =
      "Error " + error?.response
        ? error?.response?.data?.error
        : "Error while logging in, Try Again!";
    dispatch(notify(errorMessage, "error"));
  }
};

// export const getAllValidTags = () =>
//   new Promise(async (resolve) => {
//     let allTagsFile = await storage
//       .child("/tags/ALLTAGS.json")
//       .getDownloadURL();
//     let data = await fetch(allTagsFile);
//     let allTags = await data.json();
//     resolve(allTags);
//   });
