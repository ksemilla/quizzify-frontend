import { PublicAPI } from "api/base";


export const login = (data: { username: string, password: string }) => {
  return PublicAPI.post("/api/token/", data)
}