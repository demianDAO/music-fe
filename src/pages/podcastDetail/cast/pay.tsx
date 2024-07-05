import { chain } from '@/common/chain';
import { client } from '@/common/client';
import { purchaseSong } from '@/thirdweb/97/0x5d46f80305e8a69cd74c59533530cec9b23390e8';
import { Alert } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { getContract, sendAndConfirmTransaction } from 'thirdweb';
import { approve } from 'thirdweb/extensions/erc20';
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

    const [alert, setAlert] = useState("")

    return (
        <Stack sx={{ color: '#fff', marginTop: '15px' }} spacing={{ xs: 1, sm: 2, md: 4 }}>

            {alert && <Alert severity="error">{alert}</Alert>}

            <TransactionButton
                transaction={() => {
                    return approve({
                        contract: REWARD_TOKEN_CONTRACT,
                        spender: SPENDER_TOKEN_CONTRACT.address,
                        amount: prop.amount,
                    })

                    // const r = purchaseSong({
                    //     contract: SPENDER_TOKEN_CONTRACT,
                    //     tokenId: prop.tokenId,
                    //     singer: getAddress(prop.singer),
                    // })
                }}

                onTransactionConfirmed={async (_) => {
                    try {
                        const transaction = purchaseSong({
                            contract: SPENDER_TOKEN_CONTRACT,
                            tokenId: prop.tokenId,
                            singer: prop.singer,
                        })

                        await sendAndConfirmTransaction({
                            transaction,
                            account: activeAccount!,
                        });
                    } catch (error) {
                        if (error instanceof Error) {
                            setAlert(error.message);
                        } else {
                            setAlert(error as string);
                        }
                    }
                }}

                onError={(error) => {
                    setAlert(error.message);
                }}

            >Collect Now With {prop.amount} ETH</TransactionButton>
        </Stack>
    )
}