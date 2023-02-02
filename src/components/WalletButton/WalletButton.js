import MetaMaskOnboarding from "@metamask/onboarding";
import React from "react";
import store from "../../store/index";
import {
  handleNewNetwork,
  connect,
  handleNewAccounts,
} from "../../store/actions/ethers";

import { useDispatch } from "react-redux";
import "./WalletButton.scss";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

export default function OnboardingButton() {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const [balance, setBalance] = React.useState(0);
  const onboarding = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    store.subscribe(() => {
      let state = store.getState();
      // console.log(state);
      if (state.auth.user && state.auth.user.account) {
        setAccounts([state.auth.user.account]);
        setBalance(state.auth.user.balance);
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      dispatch(connect());
      window.ethereum.on("accountsChanged", changeAccount);
      return () => {
        window.ethereum.removeListener("accountsChanged", changeAccount);
      };
    }
  }, []);
  React.useEffect(() => {
    dispatch(handleNewNetwork());
  });

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      dispatch(connect());
    } else {
      onboarding.current.startOnboarding();
    }
  };

  const changeAccount = (newAccounts) => {
    dispatch(handleNewAccounts(newAccounts));
  };
  return (
    <div className="nav__connect-btn">
      <button disabled={isDisabled} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}
