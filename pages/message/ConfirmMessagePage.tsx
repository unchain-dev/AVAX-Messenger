import MessageCard from "../../components/MessageCard";
import BasicLayout from "../../components/Layout/BasicLayout";
import RequireWalletLayout from "../../components/Layout/RequireWalletLayout";
import { useMessengerContract } from "../../hooks/useMessengerContract";
import { useWallet } from "../../hooks/useWallet";

export default function ConfirmMessagePage() {
  const { currentAccount, connectWallet } = useWallet();
  const { ownMessages, acceptMessage, denyMessage } = useMessengerContract({
    currentAccount: currentAccount,
  });

  return (
    <BasicLayout>
      <RequireWalletLayout
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        <div>
          <div>Confirm Message Page !</div>
          <div>wallet is {currentAccount}</div>
          {/* メッセージの一覧表示 */}
          {ownMessages.map((message, index) => {
            return (
              <div key={index}>
                <MessageCard
                  message={message}
                  index={index}
                  onClickAccept={() => {
                    acceptMessage({ index });
                  }}
                  onClickDeny={() => denyMessage({ index })}
                />
              </div>
            );
          })}
        </div>
      </RequireWalletLayout>
    </BasicLayout>
  );
}
