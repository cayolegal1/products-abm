import { createContext, SetStateAction, Dispatch,  } from "react"


interface IGlobalUserState {

    user: string,
    password: string
};

export const UserGlobalContext = createContext(
    {
        user: {} as Partial<IGlobalUserState>,
        setUser: {} as Dispatch<SetStateAction<Partial<IGlobalUserState>>>
    }
);
