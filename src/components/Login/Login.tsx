// import NdpService from '@/common/service/ndp';
import { client } from '@/common/client';
import { useUserStore } from '@/hooks/userStore';
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { Wallet } from 'thirdweb/wallets';

type Prop = {
  isShow: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  closeDialog: Function;
};

export default function LoginWrapper(props: Prop) {
  const [userInfo, dispatch] = useUserStore();

  function successLogin(wallet: Wallet) {
    dispatch({
      type: 'login',
      data: {
        isLogin: true,
      }
    });
  }

  return (
    <ThirdwebProvider>
      <ConnectButton client={client} onConnect={successLogin} />
    </ThirdwebProvider>
  );
}
