import { observer } from 'mobx-react-lite';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';

type PrivateRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
	exact?: boolean;
};

const PublicRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {

	const authStore = useAuthStore()
	
  return (
    <Route
      {...rest}
      render={props =>
      	authStore.authStore.isLogged ? <Redirect to={{ pathname: "/" }}/> : <Component {...props} />
      }
    />
  )
}

export default observer(PublicRoute)