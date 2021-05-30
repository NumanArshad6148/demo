import { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../../redux/authors/authors.actions";
import { RootState } from "../../redux/store";

const AuthorsTable: FC = (): ReactElement => {
  const { all_authors } = useSelector((state: RootState) => state?.authors);
  const dispatch = useDispatch();

  //console.log({ all_authors });

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
          {all_authors?.map(({ id, name }) => (
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

export default AuthorsTable;
