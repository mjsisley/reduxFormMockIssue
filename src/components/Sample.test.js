import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reduxForm } from "redux-form";
import { SimpleSample } from "./Sample";
import renderer from "react-test-renderer";

function setup() {
  const spy = jest.fn();
  const store = createStore(() => ({}));
  const Decorated = reduxForm({ form: "sampleform" })(SimpleSample);

  const props = {
    param: "keyOfState",
    // state: { keyOfState: "Label" }
    state: {
      form: {
        sampleform: {
          values: { keyOfState: "Label" }
        }
      }
    }
  };
  const mockedComponent = (
    <Provider store={store}>
      <Decorated {...props}>
        <span />
      </Decorated>
    </Provider>
  );
  return mockedComponent;
}
describe("Sample Component", () => {
  it("should render the snapshot", () => {
    const mockedComponent = setup();
    const tree = renderer.create(mockedComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
