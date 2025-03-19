import axios from "axios";

export const LoginCall = async (user, dispatch) => {
    dispatch({ type: "LOGIN_START" });

    try {
        const response = await axios.post("http://localhost:4000/api/auth/login", user);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || err.message });
    }
};
