import { setFeeds } from "../reducers/feedsSlice";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const getFeeds = () => async (dispatch) => {
  try {
    const response = await fetch(`${backend_url}/api/feed/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-ski-browser-warning": true,
      },
    });
    if (response.ok) {
      const feeds = await response.json();
      dispatch(setFeeds(feeds));
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleRemember = (user_id, lurny_id) => async () => {
  try {
    await fetch(`${backend_url}/api/feed/remember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-ski-browser-warning": true,
      },
      body: { user_id, lurny_id },
    });
  } catch (error) {
    console.log(error);
  }
};
