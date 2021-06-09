import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../redux/store";
import { isEmpty } from "../utils/functions";

const DropDown = ({ getAction, type }: any) => {
  // const allCourseAuthorSelectory = (state: RootState) =>
  //   state.courses?.all_course_author;
  // const coursesSelector = createSelector(
  //   allCourseAuthorSelectory,
  //   (allCoursesAuthors: any) => allCoursesAuthors[type]
  // );

  // const data = useSelector(coursesSelector);

  const allData = useSelector((state: RootState) => state.courses);

  console.log({ action: getAction, type });

  const data = allData?.all_course_author && allData.all_course_author[type];
  const dispatch = useDispatch();
  useEffect(() => {
    //if (isEmpty(data)) {
    dispatch(getAction());
    //}
  }, [dispatch]);
  console.log({ allData, data, type });

  return (
    <div>
      <h3>{type}</h3>
      {data && JSON.stringify(data)}
    </div>
  );
};

export default DropDown;
