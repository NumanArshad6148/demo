import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "../components/login";
import { createBrowserHistory, History } from "history";

import TimeStamp from "../components/graph/TimeStamp";
import ProjectionGraph from "../components/graph/ProjectionGraph";
export const history: History = createBrowserHistory({ forceRefresh: true });

const Routes: React.FC = (): JSX.Element => (
  //@ts-ignore
  <Router history={history}>
    <Switch>
      {/* <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/hoc" exact component={CreateEditAuthor} /> */}
      {/* <ProtectedRoutes path="/" component={LayoutContainer} /> */}

      <Route path="/projection-occupancy" exact component={ProjectionGraph} />
      <Route path="/time-series" exact component={TimeStamp} />
      <Redirect from="/" to="/projection-occupancy" />
    </Switch>
  </Router>
);

export default Routes;
