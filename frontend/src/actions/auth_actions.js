import { authConstants } from "./constants"

export const login = (user) =>{
    return (dispatch) => {
        dispatch({type : authConstants.LOGIN_REQUEST, 
            payload: {
                login = true
            }
        })
    }
}