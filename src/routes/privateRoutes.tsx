import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthorsTable from "../components/authors/table";
import CreateEditCourse from "../components/courses/create";
import CoursesTable from "../components/courses/table";
import NotFoundPage from "../components/notFound";
import ListingContainer from "../ReduxMemoize/ListingContainer";

const PrivateRoutes: React.FC = (): JSX.Element => {
  const routesArray = [
    {
      path: "courses",
      component: CoursesTable,
      layout: "class",
    },
    {
      path: "courses/:id",
      component: CreateEditCourse,
      layout: "class",
    },
    {
      path: "authors",
      component: AuthorsTable,
      layout: "class",
    },
    {
      path: "memoize/:id",
      component: ListingContainer,
      layout: "class",
    },
    {
      component: NotFoundPage,
    },
  ];
  console.log({ routesArray });
  return (
    <Switch>
      {/* {routesArray.map(({ path, layout, component }) =>
        path ? (
          <Route path={`/${layout}/${path}`} exact component={component} />
        ) : (
          <Route path="*" component={component} />
        )
      )} */}
      <Route path="/courses" exact component={CoursesTable} />
      <Route path="/courses/:id" exact component={CreateEditCourse} />
      <Route path="/authors" exact component={AuthorsTable} />
      <Route path="/memoize" exact component={ListingContainer} />
      <Redirect exact from="/" to="/courses" />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default PrivateRoutes;
