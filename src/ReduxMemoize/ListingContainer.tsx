import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DropDown from "../common/dropdown";
import { getAllAuthors } from "../redux/authors/authors.actions";
import { getAllCourses, getCourses } from "../redux/courses/courses.actions";
import AuthorsListing from "./authorListing";
import CoursesListing from "./courseListing";
const ListingContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("get all is");
    dispatch(getCourses("?_page=1&_limit=1"));
  }, [dispatch]);
  return (
    <div>
      {/* <h1>author </h1>
      <AuthorsListing />
      <h1>course listing</h1>
      <CoursesListing /> */}
      <DropDown getAction={getAllCourses} type="courses" />

      <DropDown getAction={getAllAuthors} type="authors" />
    </div>
  );
};

export default ListingContainer;
