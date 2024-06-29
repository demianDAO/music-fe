import { chain } from '@/common/chain';
import { client } from '@/common/client';
import { purchaseSong } from '@/thirdweb/97/0x5d46f80305e8a69cd74c59533530cec9b23390e8';
import { Stack } from '@mui/system';
import { getContract, sendAndConfirmTransaction } from 'thirdweb';
import { approve } from "thirdweb/extensions/erc20";
import { TransactionButton, useActiveAccount } from "thirdweb/react";

const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: '0x33EEEf1C15d8BcE5F8BE1Edde48D3B0231C159b6',
});

const SPENDER_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: '0x5d46F80305e8A69Cd74C59533530Cec9b23390e8',
});

type Prop = {
    singer: string;
    tokenId: bigint;
    amount: number;
};

export default function Pay(prop: Prop) {
    const activeAccount = useActiveAccount();

    return (
        <Stack direction={'row'} sx={{ color: '#fff', marginTop: '15px' }}>
            {/* <Button variant="contained" href={podcastData[0]?.[1]?.show_note}> */}
            <TransactionButton
                transaction={() => (
                    approve({
                        contract: REWARD_TOKEN_CONTRACT,
                        spender: SPENDER_TOKEN_CONTRACT.address,
                        amount: prop.amount,
                    })
                    // purchaseSong({
                    //   contract: SPENDER_TOKEN_CONTRACT,
                    //   tokenId: 1n,
                    //   singer: "0xc0ee714715108b1a6795391f7e05a044d795ba70",
                    // })
                )}

                onTransactionConfirmed={async (_) => {
                    const transaction = purchaseSong({
                        contract: SPENDER_TOKEN_CONTRACT,
                        tokenId: prop.tokenId,
                        singer: prop.singer,
                    })

                    await sendAndConfirmTransaction({
                        transaction,
                        account: activeAccount!,
                    });
                }}

                onError={(error) => {
                    console.log("Error: ", error);
                }}

            >Collect Now With {prop.amount} ETH</TransactionButton>
        </Stack>
    )
}