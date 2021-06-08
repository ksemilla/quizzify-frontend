import { Switch } from 'react-router-dom'

import PrivateRoute from "./utils/PrivateRoute"
import PublicRoute from "./utils/PublicRoute"

import Home from "../views/home"

import Login from "../views/login"
import Signup from "../views/signup"

import Admin from "../views/admin"

import OrganizationList from "../views/admin/organizations/list"
import OrganizationCreate from "../views/admin/organizations/create"
import OrganizationDetail from "../views/organizations/detail"

import QuizCreate from "../views/organizations/detail/components/quizzes/create"

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/" component={Home} exact />

			<PublicRoute path="/login" component={Login} exact />
			<PublicRoute path="/signup" component={Signup} exact />

			<PrivateRoute path="/admin" component={Admin} exact />
			<PrivateRoute path="/admin/organizations" component={OrganizationList} exact />
			<PrivateRoute path="/admin/organizations/create" component={OrganizationCreate} exact />
			<PrivateRoute path="/organization/:id" component={OrganizationDetail} exact />

			<PrivateRoute path="/organization/:id/quizzes/create" component={QuizCreate} exact />

      {/* <Route path="" component={Page404} /> */}
    </Switch>
  );
}

export default Routes;
