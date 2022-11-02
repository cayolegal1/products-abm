import { createContext, SetStateAction, Dispatch,  } from "react"
interface IGlobalUserState {

    user: string,
    password: string,
    is_staff: boolean,
    is_user: boolean, 
};

export const UserGlobalContext = createContext(
    {
        user: {} as Partial<IGlobalUserState>,
        setUser: {} as Dispatch<SetStateAction<Partial<IGlobalUserState>>>,
    }
);
