import { useCookies } from 'react-cookie'
import LoginRoutes from './routes/LoginRoute'
import MainRoutes from './routes/MainRoutes'

const App = () => {
  const [cookies, __setCookie, __removeCookie] = useCookies(['token'])
  const token = cookies.token

  return token ? <MainRoutes /> : <LoginRoutes />
}

export default App
