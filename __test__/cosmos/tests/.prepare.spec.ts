import { Auth, Secp256k1Auth } from "@sign/core";
import { Signer, toBech32 } from "@sign/cosmos";
import { Secp256k1HdWallet } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";

const seed =
  "razor dog gown public private couple ecology paper flee connect local robot diamond stay rude join sound win ribbon soup kidney glass robot vehicle";
const rest = "http://localhost:1313";
const rpc = "http://localhost:26653";

let address: string;

let auth: Auth;
let signer: Signer;

let wallet: Secp256k1HdWallet;
let client: SigningStargateClient;

beforeAll(async () => {
  auth = Secp256k1Auth.fromMnemonic(seed);
  signer = new Signer();

  wallet = await Secp256k1HdWallet.fromMnemonic(seed);
  client = await SigningStargateClient.connectWithSigner(rpc, wallet);

  address = toBech32("osmo", auth.key.address);
});

describe("Before testing: setup Auth", () => {
  it("check bech32 address", () => {
    console.log(`bech32 address: ${address}`);
  });
});

export { rest, rpc, address, auth, signer, wallet, client };
