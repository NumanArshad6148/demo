import { memo, FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllCourses } from "../redux/courses/courses.actions";
import { getAllAuthors } from "../redux/authors/authors.actions";
import { createSelector } from "reselect";
import DropDown from "../common/dropdown";

const CourseListing: FC = memo((): ReactElement => {
  const allCourseAuthorSelectory = (state: RootState) =>
    state.courses.all_course_author;
  const coursesSelector = createSelector(
    allCourseAuthorSelectory,
    (allCoursesAuthors) => allCoursesAuthors?.courses
  );
  const courses = useSelector(coursesSelector);
  //  (state: RootState) => state?.courses?.all_course_author ?? {}
  const dispatch = useDispatch();

  console.log({ courses });

  // useEffect(() => {
  //   dispatch(getAllCourses());
  // }, [dispatch]);

  return (
    <>
      {/* <button onClick={() => dispatch(getAllAuthors())}>
        author in courses
      </button>
      <h1>table here</h1>
      <table>
        <thead>
          <th>id</th>
          <th>name</th>
        </thead>
        <tbody>
          {courses?.map(({ id, title, category }: any) => (
            <tr>
              <td>{id}</td>
              <td>{title}</td>
              <td>{category}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <DropDown getAction={getAllCourses} type="courses" />
    </>
  );
});

export default CourseListing;
