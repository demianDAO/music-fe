import { client } from '@/common/client';
import { useUserStore } from '@/hooks/userStore';
import { Stack } from '@mui/material';
import { ConnectButton } from 'thirdweb/react';
import { Wallet } from 'thirdweb/wallets';


export default function LoginWrapper() {
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
    <Stack>
      <ConnectButton client={client} onConnect={successLogin} />
    </Stack>
  );
}
