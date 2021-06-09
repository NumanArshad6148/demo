import { FC, memo, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../redux/authors/authors.actions";
import { RootState } from "../redux/store";

const AuthorsListing: FC = (): ReactElement => {
  //   const { all_authors } = useSelector((state: RootState) => state?.authors);

  const { authors = null } = useSelector(
    (state: RootState) => state?.courses?.all_course_author ?? {}
  );
  const dispatch = useDispatch();

  console.log({ authors });

  useEffect(() => {
    dispatch(getAllAuthors());
  }, [dispatch]);

  return (
    <>
      <h1>table here</h1>
      <table>
        <thead>
          <th>id</th>
          <th>name</th>
        </thead>
        <tbody>
          {authors?.map(({ id, name }: any) => (
            <tr>
              <td>{id}</td>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default memo(AuthorsListing);
