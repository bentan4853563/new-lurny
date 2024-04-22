import { login } from "../reducers/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const signIn = (accessToken, navigate) => async (dispatch) => {
  try {
    const response = await fetch(`${backend_url}/api/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      },
      body: JSON.stringify({ accessToken }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(login(data.token));
      navigate("/lurny/list");
    } else {
      if (response.status == 404) {
        toast.error("Please signup first!", {
          position: "top-right",
          onClose: () => history.push("/signup"), // Navigate after the toast is dismissed
        });

        setTimeout(() => {
          navigate("/signup");
        }, 2000);
      } else {
        toast.error(response.error, {
          position: "top-right",
        });
      }
    }
  } catch (error) {
    alert("Error during signup:", error.message);
  }
};

export const signUp = (accessToken, navigate) => async () => {
  try {
    const response = await fetch(`${backend_url}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      },
      body: JSON.stringify({ accessToken }),
    });

    // const data = await response.json();

    if (response.ok && response.status == 201) {
      toast.success("Signup successfuly. Please Signin.", {
        position: "top-right",
      });
      navigate("/signin");
    } else {
      toast.error("Already exist!", {
        position: "top-right",
      });
    }
  } catch (error) {
    alert("Error during signup:", error.message);
  }
};
