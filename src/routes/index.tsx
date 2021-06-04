import { Switch } from 'react-router-dom'

import PrivateRoute from "./utils/PrivateRoute"
import PublicRoute from "./utils/PublicRoute"

import Home from "../views/home"

import Login from "../views/login"
import Signup from "../views/signup"

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/" component={Home} exact />

			<PublicRoute path="/login" component={Login} exact />
			<PublicRoute path="/signup" component={Signup} exact />

      {/* <Route path="" component={Page404} /> */}
    </Switch>
  );
}

export default Routes;
