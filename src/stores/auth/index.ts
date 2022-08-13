import { AuthStore, User } from "types"
import create from 'zustand'

const useAuthStore = create<AuthStore>()((set)=>({
  user: null,
  setUser: (user: User) => set((state) => ({
    ...state, user
  })),
  logout: () => set((state) => ({
    ...state, user: null
  })),
}))

export default useAuthStore