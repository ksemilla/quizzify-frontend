import React from 'react'
import { AuthStore } from "./AuthStore"

type AuthStoreContextValue = {
	authStore: AuthStore
}

const AuthStoreContext = React.createContext<AuthStoreContextValue>({} as AuthStoreContextValue)

const authStore = new AuthStore()

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
	return <AuthStoreContext.Provider value={{ authStore }}>{children}</AuthStoreContext.Provider>
}

export const useAuthStore = () => React.useContext(AuthStoreContext)