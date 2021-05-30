import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { getAllCourses } from "../../redux/courses/courses.actions";
import { Form, Input, Button, Checkbox, Row, Col, Divider } from "antd";
const style = { background: "#0092ff", padding: "8px 0" };

const Authors = () => {
  const { all_courses } = useSelector((state) => state?.courses);
  const dispatch = useDispatch();

  console.log({ all_courses });

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <>
      <h1>authors index</h1>
    </>
  );
};

// const mapStateToProps = (state) => ({
//     courses: state.courses
// })

// const mapDispatchToProps = dispatch => ({
//     create: course => dispatch(createCourse(course))
// })

export default Authors;
//connect(mapStateToProps, mapDispatchToProps)(Authors);
