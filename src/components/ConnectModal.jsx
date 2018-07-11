/**
 * @flow
 */
import React from "react";
import { css } from "glamor";

type Props = {
  active: boolean,
  onRequestConnect: (string, string) => void
};

type State = {
  handle: string,
  avatarUrl: string
};

const containerCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 28, 0.90)",
  zIndex: 9999,
  overflowX: "hidden",
  overflowY: "hidden"
});

const innerContainerCss = css({
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  padding: "2rem 2rem",
  alignItems: "cetner",
  justifyContent: "center",
  opacity: 1,
  zIndex: 10000,
  backgroundColor: "#fff",
  boxShadow: "0 3px 4px 0 rgba(0, 0, 28, 0.11)"
});

const inputCss = css({
  width: "20rem",
  height: "3rem",
  marginTop: "1rem",
  borderRadius: "8px",
  fontSize: "1.6rem",
  border: "solid 1px #000028",
  padding: "0.4rem",
  ":hover": {
    boxShadow: "inset 0 0 0 1px #000028"
  },
  ":focus": {
    boxShadow: "inset 0 0 0 1px #000028",
    border: "none"
  }
});

const buttonCss = css({
  width: "100%",
  height: "3rem",
  marginTop: "1rem",
  background: "#23d2aa",
  border: "none",
  borderRadius: "8px",
  fontSize: "1.4rem",
  color: "white",
  fontWeight: "bold",
  ":hover": {
    background: "#1ca88d"
  }
});

export default class ConnectModal extends React.Component<Props, State> {
  state = {
    handle: "",
    avatarUrl: ""
  };
  onHandleChange = e => {
    this.setState({ handle: e.target.value });
  };

  onAvatarUrlChange = e => {
    this.setState({ avatarUrl: e.target.value });
  };
  keyUp = e => {
    const { onClose } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
      }
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  componentDidMount() {
    document.addEventListener("keyup", this.keyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.keyUp);
  }

  render() {
    const { onRequestConnect, active } = this.props;
    if (!active) {
      return null;
    }

    const { handle, avatarUrl } = this.state;
    return (
      <div {...containerCss}>
        <div {...innerContainerCss}>
          <input
            {...inputCss}
            onChange={this.onHandleChange}
            placeholder="Username"
          />
          <input
            {...inputCss}
            onChange={this.onAvatarUrlChange}
            placeholder="Avatar URL"
          />
          <button
            {...buttonCss}
            onClick={() => onRequestConnect(handle, avatarUrl)}
          >
            Connect
          </button>
        </div>
      </div>
    );
  }
}
