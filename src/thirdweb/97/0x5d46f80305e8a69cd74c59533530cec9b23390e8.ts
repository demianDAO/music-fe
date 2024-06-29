import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from 'thirdweb';

/**
 * Contract events
 */

/**
 * Represents the filters for the "ReleasedSong" event.
 */
export type ReleasedSongEventFilters = Partial<{
  singer: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'singer'; type: 'address' }>;
}>;

/**
 * Creates an event object for the ReleasedSong event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { releasedSongEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  releasedSongEvent({
 *  singer: ...,
 * })
 * ],
 * });
 * ```
 */
export function releasedSongEvent(filters: ReleasedSongEventFilters = {}) {
  return prepareEvent({
    signature:
      'event ReleasedSong(address indexed singer, uint256 price, string tokenURI, uint256 tokenId, uint256 amount)',
    filters,
  });
}

/**
 * Represents the filters for the "SongPurchased" event.
 */
export type SongPurchasedEventFilters = Partial<{
  tokenId: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'uint256'; name: 'tokenId'; type: 'uint256' }>;
}>;

/**
 * Creates an event object for the SongPurchased event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { songPurchasedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  songPurchasedEvent({
 *  tokenId: ...,
 * })
 * ],
 * });
 * ```
 */
export function songPurchasedEvent(filters: SongPurchasedEventFilters = {}) {
  return prepareEvent({
    signature: 'event SongPurchased(uint256 indexed tokenId, address buyer, uint256 price, address singer)',
    filters,
  });
}

/**
 * Contract read functions
 */

/**
 * Represents the parameters for the "getSongInfos" function.
 */
export type GetSongInfosParams = {
  user: AbiParameterToPrimitiveType<{ internalType: 'address'; name: 'user'; type: 'address' }>;
};

/**
 * Calls the "getSongInfos" function on the contract.
 * @param options - The options for the getSongInfos function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getSongInfos } from "TODO";
 *
 * const result = await getSongInfos({
 *  user: ...,
 * });
 *
 * ```
 */
export async function getSongInfos(options: BaseTransactionOptions<GetSongInfosParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0xc89e774e',
      [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'tokenURI',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256',
            },
          ],
          internalType: 'struct SongNFTTrade.SongDetails[]',
          name: '',
          type: 'tuple[]',
        },
      ],
    ],
    params: [options.user],
  });
}

/**
 * Calls the "nft" function on the contract.
 * @param options - The options for the nft function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { nft } from "TODO";
 *
 * const result = await nft();
 *
 * ```
 */
export async function nft(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x47ccca02',
      [],
      [
        {
          internalType: 'contract SongNFT',
          name: '',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Represents the parameters for the "songPricesByAddr" function.
 */
export type SongPricesByAddrParams = {
  arg_0: AbiParameterToPrimitiveType<{ internalType: 'address'; name: ''; type: 'address' }>;
  arg_1: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: ''; type: 'uint256' }>;
};

/**
 * Calls the "songPricesByAddr" function on the contract.
 * @param options - The options for the songPricesByAddr function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { songPricesByAddr } from "TODO";
 *
 * const result = await songPricesByAddr({
 *  arg_0: ...,
 *  arg_1: ...,
 * });
 *
 * ```
 */
export async function songPricesByAddr(options: BaseTransactionOptions<SongPricesByAddrParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0xd6fc9f89',
      [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [options.arg_0, options.arg_1],
  });
}

/**
 * Calls the "token" function on the contract.
 * @param options - The options for the token function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { token } from "TODO";
 *
 * const result = await token();
 *
 * ```
 */
export async function token(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xfc0c546a',
      [],
      [
        {
          internalType: 'contract MPToken',
          name: '',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Contract write functions
 */

/**
 * Represents the parameters for the "purchaseSong" function.
 */
export type PurchaseSongParams = {
  tokenId: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: 'tokenId'; type: 'uint256' }>;
  singer: AbiParameterToPrimitiveType<{ internalType: 'address'; name: 'singer'; type: 'address' }>;
};

/**
 * Calls the "purchaseSong" function on the contract.
 * @param options - The options for the "purchaseSong" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { purchaseSong } from "TODO";
 *
 * const transaction = purchaseSong({
 *  tokenId: ...,
 *  singer: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function purchaseSong(options: BaseTransactionOptions<PurchaseSongParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xbaa1c491',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'singer',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.tokenId, options.singer],
  });
}

/**
 * Represents the parameters for the "releasedSong" function.
 */
export type ReleasedSongParams = {
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: 'amount'; type: 'uint256' }>;
  price: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: 'price'; type: 'uint256' }>;
  uri: AbiParameterToPrimitiveType<{ internalType: 'string'; name: 'uri'; type: 'string' }>;
};

/**
 * Calls the "releasedSong" function on the contract.
 * @param options - The options for the "releasedSong" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { releasedSong } from "TODO";
 *
 * const transaction = releasedSong({
 *  amount: ...,
 *  price: ...,
 *  uri: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function releasedSong(options: BaseTransactionOptions<ReleasedSongParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x5aba30e3',
      [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'uri',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.amount, options.price, options.uri],
  });
}
