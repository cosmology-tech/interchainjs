import { RpcClient } from '@interchainjs/cosmos/query/rpc';
import { QueryClient } from '@interchainjs/cosmos/types';
import { OfflineSigner } from '@interchainjs/cosmos/types/wallet';
import { StargateImpl as TxImpl } from '@interchainjs/cosmos-types/service-ops';
import { HttpEndpoint } from '@interchainjs/types';

import { SigningClient } from './signing-client';
import { SignerOptions } from './types/signing-client';

export class StargateSigningClient extends SigningClient {
  readonly helpers: TxImpl;

  constructor(
    client: QueryClient | null | undefined,
    offlineSigner: OfflineSigner,
    options: SignerOptions = {}
  ) {
    super(client, offlineSigner, options);
    this.helpers = new TxImpl();
    this.helpers.init(this.txRpc);
  }

  static async connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): Promise<StargateSigningClient> {
    const signingClient = new StargateSigningClient(
      new RpcClient(endpoint, undefined, options.prefix),
      signer,
      options
    );

    await signingClient.connect();

    return signingClient;
  }
}
