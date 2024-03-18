import { SignerConfig } from "@cosmonauts/types";
import { defaultSignerConfig as CosmosSignerConfig } from "@cosmonauts/cosmos/defaults";
import { defaultSignerConfig as EthereumSignerConfig } from "@cosmonauts/ethereum/defaults";
import { EthTypedData } from "./types";

const publicKeyConfig: SignerConfig["publicKey"] = {
  isCompressed: CosmosSignerConfig.publicKey.isCompressed,
  hash: EthereumSignerConfig.publicKey.hash,
};

export const defaultSignerConfig: Record<string, SignerConfig> = {
  Cosmos: {
    ...CosmosSignerConfig,
    publicKey: publicKeyConfig,
  },
  Ethereum: {
    ...EthereumSignerConfig,
    publicKey: publicKeyConfig,
  },
};

export const defaultEthTypedData: Omit<EthTypedData, "message"> = {
  primaryType: "Tx",
  domain: {
    name: "Injective Web3",
    version: "1.0.0",
    chainId: "0x378",
    salt: "0",
    verifyingContract: "cosmos",
  },
  types: {
    EIP712Domain: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "version",
        type: "string",
      },
      {
        name: "chainId",
        type: "uint256",
      },
      {
        name: "verifyingContract",
        type: "string",
      },
      {
        name: "salt",
        type: "string",
      },
    ],
    Tx: [
      {
        name: "account_number",
        type: "string",
      },
      {
        name: "chain_id",
        type: "string",
      },
      {
        name: "fee",
        type: "Fee",
      },
      {
        name: "memo",
        type: "string",
      },
      {
        name: "msgs",
        type: "Msg[]",
      },
      {
        name: "sequence",
        type: "string",
      },
      {
        name: "timeout_height",
        type: "string",
      },
    ],
    Fee: [
      {
        name: "amount",
        type: "Coin[]",
      },
      {
        name: "gas",
        type: "string",
      },
    ],
    Coin: [
      {
        name: "denom",
        type: "string",
      },
      {
        name: "amount",
        type: "string",
      },
    ],
    Msg: [
      {
        name: "type",
        type: "string",
      },
      {
        name: "value",
        type: "MsgValue",
      },
    ],
    // TypeAmount: [
    //   {
    //     name: "denom",
    //     type: "string",
    //   },
    //   {
    //     name: "amount",
    //     type: "string",
    //   },
    // ],
    // MsgValue: [
    //   {
    //     name: "from_address",
    //     type: "string",
    //   },
    //   {
    //     name: "to_address",
    //     type: "string",
    //   },
    //   {
    //     name: "amount",
    //     type: "TypeAmount[]",
    //   },
    // ],
  },
};
