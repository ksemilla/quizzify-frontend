import { login } from "api"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import useAuthStore from "stores/auth"

const Login = () => {

  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const { register, handleSubmit } = useForm<{ username: string, password: string }>()

  const onSubmit = handleSubmit((data)=>{
    login(data).then(res=>{
      setUser(res.data.user)
    }).catch((err)=>{
      console.log(err.response)
    })
  })

  if (user) return <Navigate to="/" />

  return (
    <div>
      <form onSubmit={onSubmit}>
      <div>
        <label>Email</label>
        <input
          type="text"
          {...register('username', { required: true })}/>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: true })}/>
      </div>
      <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login