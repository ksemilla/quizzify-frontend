import { observer } from 'mobx-react-lite';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';

type PrivateRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
	exact?: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {

	const authStore = useAuthStore()
	const isLogged = authStore.authStore.isLogged

  return (
    <Route
      {...rest}
      render={props =>
      	isLogged ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }}/>
      }
    />
  )
}

export default observer(PrivateRoute)