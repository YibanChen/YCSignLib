import React, { Component } from "react";
import Identicon from "@polkadot/react-identicon";
import AccountListItem from "./AccountListItem";
import { Dropdown } from "react-bootstrap";

class AccountDropdown extends Component {
  constructor() {
    this.state = {
      accountSelected: false,
    };
  }
  render() {
    return (
      <div className="centered">
        <ul className="accountListContainer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dropdown className="centered" variant="success">
              <Dropdown.Toggle variant="primary">
                {"Select Account"}
                <Identicon
                  className="my-class"
                  value={
                    !!JSON.parse(localStorage.getItem("currentAccount"))
                      ? JSON.parse(localStorage.getItem("currentAccount"))
                          .address
                      : ""
                  }
                  size={48}
                  theme={"polkadot"}
                />{" "}
                {JSON.parse(localStorage.getItem("currentAccount"))
                  ? JSON.parse(localStorage.getItem("currentAccount")).meta.name
                  : ""}
              </Dropdown.Toggle>

              <Dropdown.Menu className="account-dropdown">
                {this.props.accounts.map((account, index) => (
                  <div key={index} onClick={() => this.props.handler(account)}>
                    <Dropdown.Item>
                      <AccountListItem account={account}></AccountListItem>
                    </Dropdown.Item>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ul>
      </div>
    );
  }
}

export default AccountDropdown;
