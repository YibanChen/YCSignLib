import React, { Component } from "react";
import Modal from "react-modal";
import Identicon from "@polkadot/react-identicon";
import AccountListItem from "./AccountListItem";
import { Dropdown } from "react-bootstrap";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "#eeeeee",
    backgroundColor: "#333333",
    width: "400px",
    height: "400px",
  },
};

class PromptExtensionInstallModal extends Component {
  render() {
    return (
      <Modal
        isOpen={!this.props.extensionIsInstalled}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="DownloadExtensionModal"
        sho
        uldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <h2>The Polkadot.js browser extension is required to use YibanChen.</h2>
        <p>
          You can download it{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://polkadot.js.org/extension/"
          >
            here
          </a>
        </p>
        <p>
          After downloading and signing into the extension, please reload this
          page.
        </p>
      </Modal>
    );
  }
}

export default PromptExtensionInstallModal;
