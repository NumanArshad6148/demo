import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthorsTable from "../components/authors/table";
import CreateEditCourse from "../components/courses/create";
import CoursesTable from "../components/courses/table";
import NotFoundPage from "../components/notFound";

const PrivateRoutes: React.FC = (): JSX.Element => {
  console.log("private route is called");
  return (
    <Switch>
      <Route path="/courses" exact component={CoursesTable} />
      <Route path="/courses/:id" exact component={CreateEditCourse} />
      <Route path="/authors" exact component={AuthorsTable} />
      <Redirect exact from="/" to="/courses" />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default PrivateRoutes;
