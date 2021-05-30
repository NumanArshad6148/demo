import { Dispatch, FC, ReactElement, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../../redux/authors/authors.actions";
import { useHistory, useParams } from "react-router";
import {
  createCourse,
  getSingleCourse,
  updateCourse,
} from "../../redux/courses/courses.actions";
import { Content } from "antd/lib/layout/layout";
import { RootState } from "../../redux/store";
import { dynamickeyObjectType } from "../../models/errors";

const layout = {
  labelCol: { lg: { span: 2 }, sm: { span: 4 } },
  wrapperCol: { lg: { span: 10 }, sm: { span: 16 } },
};
const tail1Layout = {
  wrapperCol: { offset: 2, span: 2 },
};

const CreateEditCourse: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();

  const { id = "new" }: { id: string } = useParams();
  const isNew: boolean = id === "new";

  const { all_authors } = useSelector((state: RootState) => state?.authors);
  const { button_loading } = useSelector((state: RootState) => state?.loading);

  useEffect(() => {
    !all_authors && dispatch(getAllAuthors());
  }, [dispatch, all_authors]);

  useEffect(() => {
    !isNew && getSingleCourse(id, form.setFieldsValue);
  }, [id, isNew, form]);

  const onFinish = (data: dynamickeyObjectType) => {
    console.log("Success:", data);
    isNew ? createCourse(data, history) : updateCourse(id, data, history);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please course title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please enter course category!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Author"
        name="authorId"
        rules={[{ required: true, message: "Please select course author!" }]}
      >
        <Select placeholder="select value">
          {all_authors?.map(({ id, name }) => (
            <Select.Option value={id}>{name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item {...tail1Layout}>
        <Button type="primary" htmlType="submit" loading={button_loading}>
          {button_loading ? `Loading` : isNew ? `Save` : `Update`}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEditCourse;
