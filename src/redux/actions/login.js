

export const loginAction = (obj) => {
    return {
        type :"LOGIN",
        obj: obj
    }
}

export const logoutAction = () => {
    return {
        type:"LOGOUT"
    }
}