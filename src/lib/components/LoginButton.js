import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import {web3Enable, web3FromAddress, web3FromSource} from "@polkadot/extension-dapp";
import Identicon from "@polkadot/react-identicon";
import PropTypes, {string} from "prop-types";
import "./style.css";
import {u8aToHex, u8aWrapBytes} from "@polkadot/util";
import {cryptoWaitReady, decodeAddress, signatureVerify} from '@polkadot/util-crypto';

class LoginButton extends Component {
    constructor() {
        super();
        this.state = {loggedIn: false};
    }

    login = () => {
        if (this.props.firstTimeLogin) {
            console.log("signing");
            this.signData();
        } else {
            console.log("verifying");
            this.verifyData();
        }
    };

    signData = async () => {
        const account = JSON.parse(localStorage.getItem("currentAccount"));
        await web3Enable('YibanChen')
        const injector = await web3FromSource(account.meta.source);
        const signRaw = injector?.signer?.signRaw;
        const wrapped = u8aWrapBytes(this.props.messageData);
        if (!!signRaw) {

            await signRaw({
                address: account.address,
                data: u8aToHex(wrapped),
                type: 'bytes'
            }).then(({signature}) => {
                console.log(signature)
                this.props.handleSignedData(signature);
                this.setState({loggedIn: true});
            })
        }
    };

    verifyData = async () => {
        this.props.handleVerificationAttempted(true);
        const isValidSignature = (signedMessage, signature, address) => {
            const publicKey = decodeAddress(address);
            const hexPublicKey = u8aToHex(publicKey);

            return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
        };

        const main = async () => {
            await cryptoWaitReady()
            const isValid = isValidSignature(
                this.props.messageData, // message
                this.props.signedData, // signature
                this.props.walletAddress // address
            );
            console.log(isValid)
            if (isValid === true) {
                this.props.handleDataWasVerified(true);
            } else {
                this.props.handleDataWasVerified(false);
            }
        }
        main();
    };

    render() {
        return (
            <Button
                style={{
                    backgroundColor: this.props.buttonBackground,
                    border: this.props.buttonBorder,
                }}
                size={this.props.buttonSize}
                onClick={this.login}
            >
                {this.state.loggedIn ? (
                    <div className="centered">
                        <Identicon
                            value={this.props.walletAddress}
                            theme={this.props.identiconTheme}
                        ></Identicon>
                        {this.props.walletName}
                    </div>
                ) : (
                    "Login"
                )}
            </Button>
        );
    }
}

LoginButton.defaultProps = {
    identiconTheme: "polkadot",
    buttonBackground: "#F19135",
    buttonBorder: "#F19135",
    buttonSize: "md",
};

LoginButton.propTypes = {
    messageData: PropTypes.string.isRequired,
    walletAddress: PropTypes.string.isRequired,
    firstTimeLogin: PropTypes.bool.isRequired,
    signedData: PropTypes.string,
    handleDataWasVerified: PropTypes.func,
    handleSignedData: PropTypes.func,
    handleVerificationAttempted: PropTypes.func,
    IdenticonTheme: PropTypes.string,
    buttonBackground: PropTypes.string,
    buttonBorder: PropTypes.string,
    buttonSize: PropTypes.string,
    walletName: PropTypes.string,
};

export default LoginButton;
