import MessageCard from "../../components/card/MessageCard";
import Layout from "../../components/layout/Layout";
import RequireWallet from "../../components/layout/RequireWallet";
import { useMessengerContract } from "../../hooks/useMessengerContract";
import { useWallet } from "../../hooks/useWallet";
import { useEffect } from "react";
import { BigNumber } from "ethers";

export default function ConfirmMessagePage() {
  const { currentAccount, connectWallet } = useWallet();
  const {
    ownMessages,
    processing,
    messengerContract,
    getOwnMessages,
    acceptMessage,
    denyMessage,
  } = useMessengerContract({
    currentAccount: currentAccount,
  });

  useEffect(() => {
    getOwnMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messengerContract]);

  return (
    <Layout>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        {processing && <div>processing...</div>}
        {ownMessages.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard
                message={message}
                onClickAccept={() => {
                  acceptMessage(BigNumber.from(index));
                }}
                onClickDeny={() => denyMessage(BigNumber.from(index))}
              />
            </div>
          );
        })}
      </RequireWallet>
    </Layout>
  );
}
