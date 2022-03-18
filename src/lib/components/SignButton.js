import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import {
    web3Enable,
    web3FromAddress,
    web3Accounts, web3FromSource,
} from "@polkadot/extension-dapp";
import {u8aToHex, u8aWrapBytes} from "@polkadot/util";

const {stringToHex} = require("@polkadot/util");

class SignButton extends Component {
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
                this.props.setSignedData(signature);
                localStorage.setItem("messageData", this.props.messageData);
                localStorage.setItem("signedData", signature);
            })
        }

        // not sure what the code below is supposed to do, or what app is supposed to be
        /* const user = app.session.user;
              user
                .save({
                  web3address: address,
                })
                .then(() => m.redraw()); */
    };

    render() {
        return (
            <Button
                variant="primary"
                className="btn-primary m-2"
                size="md"
                onClick={this.signData}
            >
                Sign
            </Button>
        );
    }
}

export default SignButton;
