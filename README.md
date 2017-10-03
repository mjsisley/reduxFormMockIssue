### Fix for formValueSelector Mocking Issue

Addressing: https://stackoverflow.com/questions/46433323/redux-form-how-to-mock-formvalueselector-in-jest

Note: Mui has been removed from this reproduction as it is not relevant to the issue in question.

### Notes and Description of Issue:

The example would imply that you are retrieving the state from `connect` in a component higher in the tree and passing it to the `Sample` component as a prop. An interesting way to use `formValueSelector` as most usage is within the `connect` function. Note that usage of the selector forces a rerender of the whole form... so it could be a performance bottleneck as the form grows.

You aren't providing the `formValueSelector` with an adequate mock for the state that the `selector` expects. 

Solution:
The `selector` expects the global state object provided by redux. The current mocked state doesn't reflect this. Changing the mock to the shape expected fixes the issue:

It is of this shape:
```
{
  form: {
    sampleform: {
      values: {
        keyOfState: "Label"
      }
    }
  }
}
```

Note: the object stored at the `sampleform` key includes more entries, but they are irrelevant for the mock.

### Reproduction Note:

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Added to CRA for demo:
* redux
* react-redux
* redux-form
* react-test-renderer