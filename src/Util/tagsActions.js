import firebase, { firestore } from "src/Firebase/Firebase";
import { notify } from "reapop";
import store from "src/Redux/store";
import { updateUser } from "src/Redux/user/userActions";

export const fetchTagUser = (tagSerial) => async (dispatch) => {
  try {
    //Valid tags check
    // let allValidTags = await getAllValidTags();
    // console.log("Valid Tags", allValidTags);
    // if (!allValidTags.some((item) => item.serial === tagSerial)) {
    //   dispatch(notify("Invalid Tag Detected", "error"));
    //   history.push("/");
    //   return;
    // }
    let query = await firestore
      .collection("users")
      .where("tags", "array-contains", tagSerial)
      .limit(1)
      .get();
    let user = null;
    let docId = null;
    query.forEach((doc) => {
      user = doc.data();
      docId = doc.id;
    });
    if (docId)
      await firestore
        .collection("users")
        .doc(docId)
        .update({
          scanCount: firebase.firestore.FieldValue.increment(1),
        });
    return user;
  } catch (error) {
    dispatch(notify(error.message, "error"));
    console.log(error);
  }
};

export const pairTag = (serial, uid) => async (dispatch) => {
  try {
    //Valid tags check
    // let allValidTags = await getAllValidTags();
    // if (!allValidTags.some((item) => item.serial === serial)) {
    //   dispatch(notify("Invalid Tag Detected", "error"));
    //   history.push("/");
    //   return;
    // }
    await firestore
      .collection("users")
      .doc(uid)
      .update({ tags: firebase.firestore.FieldValue.arrayUnion(serial) });
    let arr = store.getState().user.tags || [];
    arr.push(serial);
    dispatch(updateUser({ tags: arr }));
    dispatch(notify("Tag successfully paired", "success"));
  } catch (error) {
    dispatch(notify(error.message, "error"));
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
