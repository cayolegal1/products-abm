import { createContext, SetStateAction, Dispatch,  } from "react"
interface IGlobalUserState {

    user: string,
    password: string,
    is_admin: boolean,
    Is_user: boolean, 
};

interface IGlobalUpdate {

    shouldUpdate: boolean
};

export const UserGlobalContext = createContext(
    {
        user: {} as Partial<IGlobalUserState>,
        setUser: {} as Dispatch<SetStateAction<Partial<IGlobalUserState>>>,
    }
);
