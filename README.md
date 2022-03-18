# YibanChen React Login

This package contains React components to allow verification with YibanChen addresses via the Polkadot browser extension.

## Installation

```
npm i yibanchen-react-login
```

To make sure Bootstrap styles are loaded, add

```
import "bootstrap/dist/css/bootstrap.css";
```

into the file importing the component(s).

## Components and Props

### LoginButton

#### Description

A button that enables a user to sign in with their Substrate/Polkadot wallet

#### Props

| Prop                        | Type     | Description                                                                                                   |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| messageData                 | string   | The message to be signed (required)                                                                           |
| signedData                  | string   | If not first log in, The signed data to verify (required)                                                     |
| walletAddress               | string   | The address of the Polkadot/Substrate wallet (required)                                                       |
| firstTimeLogin              | boolean  | Boolean indicating if this is the wallet's first log in (required)                                            |
| handleSignedData            | function | A function from the parent component to handle the signed data after signing                                  |
| handleDataWasVerified       | function | A function from the parent component to handle whether the data was signed or verified after successful login |
| handleVerificationAttempted | function | A function from the parent component to handle whether verification was attempted                             |
| buttonSize                  | string   | Size of the login button, options are 'sm', 'md', or "lg" (default "md")                                      |
| buttonBackground            | string   | Color of the button background (default "#F19135")                                                            |
| buttonBorder                | string   | Color of the button border (default "#F19135")                                                                |
| identiconTheme              | string   | theme for the Polkadot identicon, options are 'polkadot', 'substrate', 'beachball' or 'jdenticon'             |
| walletName                  | string   | name attached to the wallet (optional)                                                                        |

#### Example

```js
<LoginButton
  messageData={this.dataToSign}
  signedData={this.findSignedData()}
  walletAddress={this.state.selectedAccount.address}
  firstTimeLogin={this.determineIfFirstTimeLogin(
    this.state.selectedAccount.address
  )}
  handleSignedData={this.setSignedData}
  handleDataWasVerified={(data) => {
    this.setState({ dataWasVerified: data });
  }}
  handleVerificationAttempted={(data) => {
    this.setState({ verificationAttempted: data });
  }}
  buttonSize={"lg"}
  identiconTheme={"polkadot"}
></LoginButton>
```
