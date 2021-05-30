import React, { FC, ReactElement, useEffect, useState } from "react";
import { Input, Button } from "antd";
import { login } from "../../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { getUser, isEmpty } from "../../utils/functions";
import { LoginTrack } from "../../utils/constants";
import { clearError } from "../../redux/errors/errros.actions";
import { useHistory, useLocation } from "react-router";
import { RootState } from "../../redux/store";
import { dynamickeyObjectType } from "../../models/errors";
import { Location } from "history";
import { toast } from "react-toastify";
import {
  Field,
  Formik,
  Form,
  ErrorMessage,
  FieldArray,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { usePromiseTracker } from "react-promise-tracker";
const layout = {
  labelCol: { span: 4, offset: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(" email is required"),
  password: Yup.string().required("password is required"),
});

const Login: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { state } = useLocation<Location>();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { promiseInProgress } = usePromiseTracker({ area: LoginTrack });

  console.log({ promiseInProgress });

  // console.log(history, state);
  const all_errors = useSelector((state: RootState) => state?.errors)
    ?.all_errors;
  const button_loading = useSelector((state: RootState) => state?.loading)
    ?.button_loading;

  const onFinish = (data: dynamickeyObjectType) => {
    console.log("Success:", data);
    dispatch(login(data, history));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const clearErrors = (errors: dynamickeyObjectType) => {
    if (!isEmpty(all_errors)) {
      dispatch(clearError());
    }
  };

  if (getUser()) {
    history.push(`${state?.pathname ?? `/courses`}`);
  }

  const loginForm = useFormik({
    initialValues: formData,
    validationSchema: LoginSchema,

    onSubmit: (values) => {
      dispatch(login(values, history));
    },
  });

  useEffect(() => {
    console.log({ all_errors, loginForm });
    all_errors && loginForm.setErrors(all_errors);
    // if (all_errors) {
    //   if (isEmpty(loginForm.errors)) {
    //     loginForm.validateForm();
    //   } else {
    //     loginForm.setErrors(all_errors);
    //   }
    // }
  }, [all_errors, loginForm]);

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    all_errors && dispatch(clearError());
    loginForm.handleBlur(event);
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={loginForm.handleSubmit}>
        <Input
          name="email"
          onChange={loginForm.handleChange}
          value={loginForm.values.email}
          onBlur={handleBlur}
        />
        {loginForm.errors.email && loginForm.touched.email ? (
          <p>{loginForm.errors.email}</p>
        ) : null}
        <Input
          name="password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
          onBlur={handleBlur}
        />
        {loginForm.errors.password && loginForm.touched.password ? (
          <p>{loginForm.errors.password}</p>
        ) : null}
        <button type="submit">
          {promiseInProgress ? `...loading` : `Submit`}
        </button>
      </form>
      {/* <Form
        {...layout}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={clearErrors}
      >
        <Form.Item
          label="Email"
          name="email"
          validateStatus={all_errors?.email && "error"}
          help={all_errors?.email}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateStatus={all_errors?.password && "error"}
          help={all_errors?.password}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={button_loading}>
            {button_loading ? `Loading` : `Submit`}
          </Button>
        </Form.Item>
      </Form> */}
      {/* <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="Jane" />
            {errors.firstName && touched.firstName ? (
              <p>{errors.firstName}</p>
            ) : null}
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />
            {errors.lastName && touched.lastName ? (
              <p>{errors.lastName}</p>
            ) : null}
            <Field name="color" as="select">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </Field>

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            <ErrorMessage name="email" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik> */}
    </>
  );
};

export default Login;
