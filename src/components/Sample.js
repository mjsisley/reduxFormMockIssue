import React from "react";
import { reduxForm, formValueSelector, Field } from "redux-form";
import { connect } from "react-redux";

const Demo = ({ name, label }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%"
    }}
  >
    <label>{label}</label>
    <Field name={name} component="input" type="text" />
  </div>
);

const selector = formValueSelector("sampleform");

export class SimpleSample extends React.Component {
  render() {
    const { param, state } = this.props;
    const label = selector(state, param || "keyOfState");
    return (
      <form>
        <h1>Example Redux Form with Selector</h1>
        <Demo name="keyOfState" label={label} />
      </form>
    );
  }
}

export default connect(state => ({ state }))(
  reduxForm({
    form: "sampleform"
  })(SimpleSample)
);
