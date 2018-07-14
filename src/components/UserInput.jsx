import React from "react";
import { css } from "glamor";

type Props = {
  onSend: string => void
};

type State = {
  value: string
};

let inputContainerCss = css({
  paddingTop: "1rem",
  paddingLeft: "1rem",
  display: "flex",
  justifyContent: "space-between"
});

let textContainerCss = css({
  borderRadius: "8px",
  height: "2rem",
  width: "100%",
  border: "none",
  fontSize: "1rem"
});

let buttonCss = css({
  border: "none",
  fontSize: "1rem",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  width: "5rem",
  height: "2rem",
  background: "rgb(93, 219, 192)"
});

export default class UserInput extends React.Component<Props, State> {
  state = {
    value: ""
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSend = () => {
    const { value } = this.state;
    if (value === "") {
      return;
    }
    const { onSend } = this.props;

    onSend(value);
    this.setState({ value: "" });
  };

  onKeyPress = e => {
    switch (e.key) {
      case "Enter":
        this.onSend();
        break;
      default:
        break;
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div {...inputContainerCss}>
        <input
          {...textContainerCss}
          value={value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder="Type your message here"
        />
        <button {...buttonCss} onClick={this.onSend}>
          Send
        </button>
      </div>
    );
  }
}
