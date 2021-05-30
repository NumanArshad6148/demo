import React from "react";
import HOC from "./hocAuthors";

const CreateEditAuthor = ({ name = "ali" }) => {
  return <h1>create edit author</h1>;
};

const NewAuthor = HOC(CreateEditAuthor);
export default (props) => <NewAuthor {...props} name="nice" />;
