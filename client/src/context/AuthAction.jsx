
export const LoginStart = (user) => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
    payload: error,
})