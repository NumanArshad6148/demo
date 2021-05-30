import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import * as coursesActions from "./courses.actions";
import { getUser } from "../../utils/functions";
import { configure, shallow, mount, render } from "enzyme";
import * as Redux from "react-redux";
// import Adapter from "enzyme-adapter-react-16";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { Provider } from "react-redux";
import CreateEditCourse from "../../components/courses/create";
import Login from "../../components/login";

configure({ adapter: new Adapter() });

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// describe("async actions", () => {
//   afterEach(() => {
//     fetchMock.restore();
//   });

//   describe("load courses thunk", () => {
//     test("fetch courses and start loading stop loading", () => {
//       fetchMock.getOnce("*", {
//         //body :courses,
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getUser()?.token}`,
//       });

//       const store = mockStore({
//         courses: { all_courses: null },
//         authors: { all_authors: null },
//         errors: { all_errors: null },
//         loading: { loading: false, button_loading: false },
//       });
//       return store
//         .dispatch(coursesActions.fetchSomething())
//         .then(() => expect(store.getActions()).toBe("numan actions"));
//     });
//   });
// });

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useSelector: jest.fn(),
// }));

describe("course form testing", () => {
  beforeEach(() => {
    jest
      .spyOn(Redux, "useSelector")
      .mockImplementation((state) => state?.errors?.all_errors);
  });
  test("testting action is", () => {
    const store = mockStore({ errors: { all_errors: null } });
    const props = {
      history: { location: { state: {} } },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Login {...props} />
      </Provider>
    );
    // console.log(wrapper.debug());

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe("Login");
    expect(wrapper.find("#login_email").debug()).toBe(1);
    // let loginWrapper = wrapper.find("#login_email").debug().simulate("change");
    // expect(loginWrapper.prop("email")).toBe("hlll");
  });
});
