import { TxRpc } from "./types";
import * as _CosmosAuthV1beta1Queryrpc from "./cosmos/auth/v1beta1/query.rpc.Query";
import * as _CosmosBankV1beta1Queryrpc from "./cosmos/bank/v1beta1/query.rpc.Query";
import * as _CosmosGovV1beta1Queryrpc from "./cosmos/gov/v1beta1/query.rpc.Query";
import * as _CosmosStakingV1beta1Queryrpc from "./cosmos/staking/v1beta1/query.rpc.Query";
import * as _CosmwasmWasmV1Queryrpc from "./cosmwasm/wasm/v1/query.rpc.Query";
import * as _CosmosAuthzV1beta1Txrpc from "./cosmos/authz/v1beta1/tx.rpc.msg";
import * as _CosmosBankV1beta1Txrpc from "./cosmos/bank/v1beta1/tx.rpc.msg";
import * as _CosmosDistributionV1beta1Txrpc from "./cosmos/distribution/v1beta1/tx.rpc.msg";
import * as _CosmosGovV1beta1Txrpc from "./cosmos/gov/v1beta1/tx.rpc.msg";
import * as _CosmosStakingV1beta1Txrpc from "./cosmos/staking/v1beta1/tx.rpc.msg";
import * as _IbcApplicationsTransferV1Txrpc from "./ibc/applications/transfer/v1/tx.rpc.msg";
import * as _CosmwasmWasmV1Txrpc from "./cosmwasm/wasm/v1/tx.rpc.msg";
export interface QueryImpl extends _CosmosAuthV1beta1Queryrpc.QueryImpl, _CosmosBankV1beta1Queryrpc.QueryImpl, _CosmosGovV1beta1Queryrpc.QueryImpl, _CosmosStakingV1beta1Queryrpc.QueryImpl, _CosmwasmWasmV1Queryrpc.QueryImpl {}
export class QueryImpl {
  rpc: TxRpc;
  init(rpc: TxRpc) {
    this.rpc = rpc;
    this.accounts = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).accounts;
    this.account = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).account;
    this.accountAddressByID = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).accountAddressByID;
    this.getAuthParams = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).params;
    this.moduleAccounts = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).moduleAccounts;
    this.moduleAccountByName = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).moduleAccountByName;
    this.bech32Prefix = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).bech32Prefix;
    this.addressBytesToString = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).addressBytesToString;
    this.addressStringToBytes = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).addressStringToBytes;
    this.accountInfo = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).accountInfo;
    this.balance = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).balance;
    this.allBalances = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).allBalances;
    this.spendableBalances = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).spendableBalances;
    this.spendableBalanceByDenom = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).spendableBalanceByDenom;
    this.totalSupply = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).totalSupply;
    this.supplyOf = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).supplyOf;
    this.getBankParams = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).params;
    this.denomMetadata = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).denomMetadata;
    this.denomMetadataByQueryString = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).denomMetadataByQueryString;
    this.denomsMetadata = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).denomsMetadata;
    this.denomOwners = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).denomOwners;
    this.denomOwnersByQuery = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).denomOwnersByQuery;
    this.sendEnabled = _CosmosBankV1beta1Queryrpc.createClientImpl(rpc).sendEnabled;
    this.proposal = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).proposal;
    this.proposals = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).proposals;
    this.getVote = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).vote;
    this.votes = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).votes;
    this.getGovParams = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).params;
    this.getDeposit = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).deposit;
    this.deposits = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).deposits;
    this.tallyResult = _CosmosGovV1beta1Queryrpc.createClientImpl(rpc).tallyResult;
    this.validators = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).validators;
    this.validator = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).validator;
    this.validatorDelegations = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).validatorDelegations;
    this.validatorUnbondingDelegations = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).validatorUnbondingDelegations;
    this.delegation = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).delegation;
    this.unbondingDelegation = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).unbondingDelegation;
    this.delegatorDelegations = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).delegatorDelegations;
    this.delegatorUnbondingDelegations = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).delegatorUnbondingDelegations;
    this.redelegations = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).redelegations;
    this.delegatorValidators = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).delegatorValidators;
    this.delegatorValidator = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).delegatorValidator;
    this.historicalInfo = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).historicalInfo;
    this.pool = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).pool;
    this.getStakingParams = _CosmosStakingV1beta1Queryrpc.createClientImpl(rpc).params;
    this.contractInfo = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).contractInfo;
    this.contractHistory = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).contractHistory;
    this.contractsByCode = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).contractsByCode;
    this.allContractState = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).allContractState;
    this.rawContractState = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).rawContractState;
    this.smartContractState = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).smartContractState;
    this.code = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).code;
    this.codes = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).codes;
    this.pinnedCodes = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).pinnedCodes;
    this.getWasmParams = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).params;
    this.contractsByCreator = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).contractsByCreator;
    this.buildAddress = _CosmwasmWasmV1Queryrpc.createClientImpl(rpc).buildAddress;
  }
}
export interface StargateImpl extends _CosmosAuthzV1beta1Txrpc.StargateImpl, _CosmosBankV1beta1Txrpc.StargateImpl, _CosmosDistributionV1beta1Txrpc.StargateImpl, _CosmosGovV1beta1Txrpc.StargateImpl, _CosmosStakingV1beta1Txrpc.StargateImpl, _IbcApplicationsTransferV1Txrpc.StargateImpl {}
export class StargateImpl {
  rpc: TxRpc;
  init(rpc: TxRpc) {
    this.rpc = rpc;
    this.grant = _CosmosAuthzV1beta1Txrpc.createClientImpl(rpc).grant;
    this.exec = _CosmosAuthzV1beta1Txrpc.createClientImpl(rpc).exec;
    this.revoke = _CosmosAuthzV1beta1Txrpc.createClientImpl(rpc).revoke;
    this.send = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).send;
    this.multiSend = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).multiSend;
    this.updateBankParams = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).updateParams;
    this.setSendEnabled = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).setSendEnabled;
    this.setWithdrawAddress = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).setWithdrawAddress;
    this.withdrawDelegatorReward = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).withdrawDelegatorReward;
    this.withdrawValidatorCommission = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).withdrawValidatorCommission;
    this.fundCommunityPool = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).fundCommunityPool;
    this.updateParams = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).updateParams;
    this.communityPoolSpend = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).communityPoolSpend;
    this.depositValidatorRewardsPool = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).depositValidatorRewardsPool;
    this.submitProposal = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).submitProposal;
    this.vote = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).vote;
    this.voteWeighted = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).voteWeighted;
    this.deposit = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).deposit;
    this.createValidator = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).createValidator;
    this.editValidator = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).editValidator;
    this.delegate = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).delegate;
    this.beginRedelegate = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).beginRedelegate;
    this.undelegate = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).undelegate;
    this.cancelUnbondingDelegation = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).cancelUnbondingDelegation;
    this.updateStakingParams = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).updateParams;
    this.transfer = _IbcApplicationsTransferV1Txrpc.createClientImpl(rpc).transfer;
    this.updateIBCTransferParams = _IbcApplicationsTransferV1Txrpc.createClientImpl(rpc).updateParams;
  }
}
export interface CosmWasmStargateImpl extends _CosmosAuthzV1beta1Txrpc.CosmWasmStargateImpl, _CosmosBankV1beta1Txrpc.CosmWasmStargateImpl, _CosmosDistributionV1beta1Txrpc.CosmWasmStargateImpl, _CosmosGovV1beta1Txrpc.CosmWasmStargateImpl, _CosmosStakingV1beta1Txrpc.CosmWasmStargateImpl, _CosmwasmWasmV1Txrpc.CosmWasmStargateImpl, _IbcApplicationsTransferV1Txrpc.CosmWasmStargateImpl {}
export class CosmWasmStargateImpl {
  rpc: TxRpc;
  init(rpc: TxRpc) {
    this.rpc = rpc;
    this.grant = _CosmosAuthzV1beta1Txrpc.createClientImpl(rpc).grant;
    this.exec = _CosmosAuthzV1beta1Txrpc.createClientImpl(rpc).exec;
    this.revoke = _CosmosAuthzV1beta1Txrpc.createClientImpl(rpc).revoke;
    this.send = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).send;
    this.multiSend = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).multiSend;
    this.updateBankParams = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).updateParams;
    this.setSendEnabled = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).setSendEnabled;
    this.setWithdrawAddress = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).setWithdrawAddress;
    this.withdrawDelegatorReward = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).withdrawDelegatorReward;
    this.withdrawValidatorCommission = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).withdrawValidatorCommission;
    this.fundCommunityPool = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).fundCommunityPool;
    this.updateParams = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).updateParams;
    this.communityPoolSpend = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).communityPoolSpend;
    this.depositValidatorRewardsPool = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).depositValidatorRewardsPool;
    this.submitProposal = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).submitProposal;
    this.vote = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).vote;
    this.voteWeighted = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).voteWeighted;
    this.deposit = _CosmosGovV1beta1Txrpc.createClientImpl(rpc).deposit;
    this.createValidator = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).createValidator;
    this.editValidator = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).editValidator;
    this.delegate = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).delegate;
    this.beginRedelegate = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).beginRedelegate;
    this.undelegate = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).undelegate;
    this.cancelUnbondingDelegation = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).cancelUnbondingDelegation;
    this.updateStakingParams = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).updateParams;
    this.storeCode = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).storeCode;
    this.instantiateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).instantiateContract;
    this.instantiateContract2 = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).instantiateContract2;
    this.executeContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).executeContract;
    this.migrateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).migrateContract;
    this.updateAdmin = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateAdmin;
    this.clearAdmin = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).clearAdmin;
    this.updateInstantiateConfig = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateInstantiateConfig;
    this.updateWasmParams = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateParams;
    this.sudoContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).sudoContract;
    this.pinCodes = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).pinCodes;
    this.unpinCodes = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).unpinCodes;
    this.storeAndInstantiateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).storeAndInstantiateContract;
    this.removeCodeUploadParamsAddresses = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).removeCodeUploadParamsAddresses;
    this.addCodeUploadParamsAddresses = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).addCodeUploadParamsAddresses;
    this.storeAndMigrateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).storeAndMigrateContract;
    this.updateContractLabel = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateContractLabel;
    this.transfer = _IbcApplicationsTransferV1Txrpc.createClientImpl(rpc).transfer;
    this.updateIBCTransferParams = _IbcApplicationsTransferV1Txrpc.createClientImpl(rpc).updateParams;
  }
}