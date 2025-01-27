import { UserType } from "./userType"

export type action = {
    type: 'LOGIN',
    data: UserType
} | {
    type: 'DELETE_USER',
    data: Partial<UserType> & { id?: number }
} | {
    type: 'UPDATE',
    data: UserType
} | {
    type: 'GET',
    data: Partial<UserType> & { email?: string }
}


export const actionUser = (state: UserType, action: action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.data}
        case 'DELETE_USER':
            //go to home!!
        case 'UPDATE':
            state = { ...state, ...action.data }
            return state
        default://'GET'
            return state
    }
}