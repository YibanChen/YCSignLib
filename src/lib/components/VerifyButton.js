import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import {
    web3Enable,
    web3FromAddress,
    web3Accounts,
} from "@polkadot/extension-dapp";
import {cryptoWaitReady, decodeAddress, signatureVerify} from "@polkadot/util-crypto";
import {u8aToHex} from "@polkadot/util";

const {stringToHex} = require("@polkadot/util");

class VerifyButton extends Component {
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
                variant="primary"
                className="btn-primary m-2"
                size="md"
                onClick={this.verifyData}
            >
                Verify
            </Button>
        );
    }
}

export default VerifyButton;
