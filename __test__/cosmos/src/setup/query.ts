import { HttpEndpoint } from "@cosmonauts/core";
import { Query, QueryParser } from "@cosmonauts/cosmos-proto";

import { QueryClientImpl as Bank } from "../../codegen/cosmos/bank/v1beta1/query.rpc.Query";
import { QueryClientImpl as Gov } from "../../codegen/cosmos/gov/v1beta1/query.rpc.Query";
import { QueryClientImpl as Staking } from "../../codegen/cosmos/staking/v1beta1/query.rpc.Query";
import {
  BondStatus,
  bondStatusToJSON,
} from "../../codegen/cosmos/staking/v1beta1/staking";

export class QueryParserExt extends QueryParser {
  readonly queryParser: QueryParser;

  constructor(endpoint: string | HttpEndpoint) {
    super(endpoint);
  }

  static fromQuery(query: Query) {
    return new QueryParserExt(query.endpoint);
  }

  get bank() {
    return this.about(Bank);
  }

  get gov() {
    return this.about(Gov);
  }

  get staking() {
    return this.about(Staking);
  }

  getBalance = async (address: string, denom: string) => {
    const { balance } = await this.bank.balance({ address, denom });
    return balance;
  };

  getProposal = async (id: bigint) => {
    const { proposal } = await this.gov.proposal({
      proposalId: id,
    });
    return proposal;
  };

  getVotingParams = async () => {
    const { votingParams } = await this.gov.params({
      paramsType: "voting",
    });
    return votingParams;
  };

  getDepositParams = async () => {
    const { depositParams } = await this.gov.params({
      paramsType: "deposit",
    });
    return depositParams;
  };

  getTallyParams = async () => {
    const { tallyParams } = await this.gov.params({
      paramsType: "tallying",
    });
    return tallyParams;
  };

  getValidators = async () => {
    const { validators } = await this.staking.validators({
      status: bondStatusToJSON(BondStatus.BOND_STATUS_BONDED),
    });
    return validators;
  };

  getDelegations = async (delegatorAddr: string) => {
    const { delegationResponses } = await this.staking.delegatorDelegations({
      delegatorAddr,
    });
    return delegationResponses;
  };

  getDelegation = async (delegatorAddr: string, validatorAddr: string) => {
    const { delegationResponse } = await this.staking.delegation({
      delegatorAddr,
      validatorAddr,
    });
    return delegationResponse;
  };
}
