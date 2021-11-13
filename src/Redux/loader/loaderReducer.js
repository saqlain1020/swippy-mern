import { LOADER_START, LOADER_STOP } from "./loaderConstants";

const initialState = true;

const loaderReducer = (state = initialState, { type }) => {
  switch (type) {
    case LOADER_START:
      return true;
    case LOADER_STOP:
      return false;
    default:
      return state;
  }
};

export const loaderStart = () => ({
  type: LOADER_START,
});

export const loaderStop = () => ({
  type: LOADER_STOP,
});

export default loaderReducer;
