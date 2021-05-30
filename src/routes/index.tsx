import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "../components/login";
import Register from "../components/register";
import ProtectedRoutes from "./protectedRoutesMiddleware";
import { createBrowserHistory, History } from "history";
import LayoutContainer from "./layoutContainer";
import CreateEditAuthor from "../components/authors/create";
export const history: History = createBrowserHistory({ forceRefresh: true });

const Routes: React.FC = (): JSX.Element => (
  //@ts-ignore
  <Router history={history}>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/hoc" exact component={CreateEditAuthor} />

      <ProtectedRoutes path="/" component={LayoutContainer} />
    </Switch>
  </Router>
);

export default Routes;
