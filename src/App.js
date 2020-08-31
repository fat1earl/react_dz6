import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import "./App.css";

const TextInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
);

const NumericInput = ({ value, onChange }) => (
  <input type="number" value={value} onChange={onChange} />
);

const withLocalStorage = (Component, initialValue, storageKey) => {
  class SetLocalStorage extends React.Component {
    static displayName = `withLocalStorage(${
      Component.displayName || Component.name || ""
    })`;
    constructor(props) {
      super(props);

      const value = localStorage.getItem(storageKey);

      this.state = {
        value: value ? JSON.parse(value) : initialValue,
      };
    }

    onChange = (e) => {
      this.setState({ value: e.target.value });

      localStorage.setItem(storageKey, JSON.stringify(this.state.value));
    };

    render() {
      return (
        <Component
          {...this.props}
          value={this.state.value}
          onChange={this.onChange}
        />
      );
    }
  }

  hoistNonReactStatics(SetLocalStorage, Component);

  return SetLocalStorage;
};

const TextInputWithLocalStorage = withLocalStorage(
  TextInput,
  "123",
  "text-input"
);
const NumericInputWithLocalStorage = withLocalStorage(
  NumericInput,
  10,
  "numeric-input"
);

const App = () => (
  <>
    <TextInputWithLocalStorage />
    <NumericInputWithLocalStorage />
  </>
);

export default App;
