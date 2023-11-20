# Registered Messages

## Stargate Messages

Below is a list of message types that are naturally supported by Signer classes in `@sign/stargate` and `@sign/cosmwasm-stargate`. All the types and constants (of type `TelescopeGeneratedType`) are also exported in these packages.

| Field        | Type Url                                                    | Exported Name                      |
| :----------- | :---------------------------------------------------------- | :--------------------------------- |
| authz        | /cosmos.authz.v1beta1.MsgExec                               | MsgExec                            |
| authz        | /cosmos.authz.v1beta1.MsgGrant                              | MsgGrant                           |
| authz        | /cosmos.authz.v1beta1.MsgRevoke                             | MsgRevoke                          |
| bank         | /cosmos.bank.v1beta1.MsgSend                                | MsgSend                            |
| bank         | /cosmos.bank.v1beta1.MsgMultiSend                           | MsgMultiSend                       |
| distribution | /cosmos.distribution.v1beta1.MsgFundCommunityPool           | MsgFundCommunityPool               |
| distribution | /cosmos.distribution.v1beta1.MsgSetWithdrawAddress          | MsgSetWithdrawAddress              |
| distribution | /cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission | MsgWithdrawValidatorCommission     |
| feegrant     | /cosmos.feegrant.v1beta1.MsgGrantAllowance                  | MsgGrantAllowance                  |
| feegrant     | /cosmos.feegrant.v1beta1.MsgRevokeAllowance                 | MsgRevokeAllowance                 |
| gov          | /cosmos.gov.v1.MsgDeposit                                   | **MsgDepositV1**                   |
| gov          | /cosmos.gov.v1.MsgExecLegacyContent                         | **MsgExecLegacyContentV1**         |
| gov          | /cosmos.gov.v1.MsgSubmitProposal                            | **MsgSubmitProposalV1**            |
| gov          | /cosmos.gov.v1.MsgVote                                      | **MsgVoteV1**                      |
| gov          | /cosmos.gov.v1.MsgVoteWeighted                              | **MsgVoteWeightedV1**              |
| gov          | /cosmos.gov.v1beta1.MsgDeposit                              | MsgDeposit                         |
| gov          | /cosmos.gov.v1beta1.MsgSubmitProposal                       | MsgSubmitProposal                  |
| gov          | /cosmos.gov.v1beta1.MsgVote                                 | MsgVote                            |
| gov          | /cosmos.gov.v1beta1.MsgVoteWeighted                         | MsgVoteWeighted                    |
| group        | /cosmos.group.v1.MsgCreateGroup                             | MsgCreateGroup                     |
| group        | /cosmos.group.v1.MsgCreateGroupPolicy                       | MsgCreateGroupPolicy               |
| group        | /cosmos.group.v1.MsgCreateGroupWithPolicy                   | MsgCreateGroupWithPolicy           |
| group        | /cosmos.group.v1.MsgExec                                    | **MsgGroupExec**                   |
| group        | /cosmos.group.v1.MsgLeaveGroup                              | MsgLeaveGroup                      |
| group        | /cosmos.group.v1.MsgSubmitProposal                          | **MsgGroupSubmitProposal**         |
| group        | /cosmos.group.v1.MsgUpdateGroupAdmin                        | MsgUpdateGroupAdmin                |
| group        | /cosmos.group.v1.MsgUpdateGroupMembers                      | MsgUpdateGroupMembers              |
| group        | /cosmos.group.v1.MsgUpdateGroupMetadata                     | MsgUpdateGroupMetadata             |
| group        | /cosmos.group.v1.MsgUpdateGroupPolicyAdmin                  | MsgUpdateGroupPolicyAdmin          |
| group        | /cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy         | MsgUpdateGroupPolicyDecisionPolicy |
| group        | /cosmos.group.v1.MsgUpdateGroupPolicyMetadata               | MsgUpdateGroupPolicyMetadata       |
| group        | /cosmos.group.v1.MsgVote                                    | **MsgGroupVote**                   |
| group        | /cosmos.group.v1.MsgWithdrawProposal                        | MsgWithdrawProposal                |
| staking      | /cosmos.staking.v1beta1.MsgBeginRedelegate                  | MsgBeginRedelegate                 |
| staking      | /cosmos.staking.v1beta1.MsgCreateValidator                  | MsgCreateValidator                 |
| staking      | /cosmos.staking.v1beta1.MsgDelegate                         | MsgDelegate                        |
| staking      | /cosmos.staking.v1beta1.MsgEditValidator                    | MsgEditValidator                   |
| staking      | /cosmos.staking.v1beta1.MsgUndelegate                       | MsgUndelegate                      |
| vesting      | /cosmos.vesting.v1beta1.MsgCreateVestingAccount             | MsgCreateVestingAccount            |
| ibc          | /ibc.applications.transfer.v1.MsgTransfer                   | MsgTransfer                        |
| ibc          | /ibc.core.channel.v1.MsgChannelCloseConfirm                 | MsgChannelCloseConfirm             |
| ibc          | /ibc.core.channel.v1.MsgChannelCloseInit                    | MsgChannelCloseInit                |
| ibc          | /ibc.core.channel.v1.MsgChannelOpenAck                      | MsgChannelOpenAck                  |
| ibc          | /ibc.core.channel.v1.MsgChannelOpenConfirm                  | MsgChannelOpenConfirm              |
| ibc          | /ibc.core.channel.v1.MsgChannelOpenInit                     | MsgChannelOpenInit                 |
| ibc          | /ibc.core.channel.v1.MsgChannelOpenTry                      | MsgChannelOpenTry                  |
| ibc          | /ibc.core.channel.v1.MsgRecvPacket                          | MsgRecvPacket                      |
| ibc          | /ibc.core.channel.v1.MsgTimeout                             | MsgTimeout                         |
| ibc          | /ibc.core.channel.v1.MsgTimeoutOnClose                      | MsgTimeoutOnClose                  |
| ibc          | /ibc.core.client.v1.MsgCreateClient                         | MsgCreateClient                    |
| ibc          | /ibc.core.client.v1.MsgSubmitMisbehaviour                   | MsgSubmitMisbehaviour              |
| ibc          | /ibc.core.client.v1.MsgUpdateClient                         | MsgUpdateClient                    |
| ibc          | /ibc.core.client.v1.MsgUpgradeClient                        | MsgUpgradeClient                   |
| ibc          | /ibc.core.connection.v1.MsgConnectionOpenAck                | MsgConnectionOpenAck               |
| ibc          | /ibc.core.connection.v1.MsgConnectionOpenConfirm            | MsgConnectionOpenConfirm           |
| ibc          | /ibc.core.connection.v1.MsgConnectionOpenInit               | MsgConnectionOpenInit              |
| ibc          | /ibc.core.connection.v1.MsgConnectionOpenTry                | MsgConnectionOpenTry               |

> NOTE: the bold exported names are messages that are different from names in typeUrl. They're renamed because there are name conflicts.

> Code for stargate messages can be found in [cosmos/stargate/src/stargate.ts](https://github.com/cosmology-tech/sign/blob/main/cosmos/stargate/src/stargate.ts)

## CosmWasm Messages

Below is a list of message types that are naturally supported by Signer classes only in `@sign/cosmwasm-stargate`. All the types and constants (of type `TelescopeGeneratedType`) are also exported in this package.

| Field    | Type Url                                  | Exported Name           |
| :------- | :---------------------------------------- | :---------------------- |
| cosmwasm | /cosmwasm.wasm.v1.MsgClearAdmin           | MsgClearAdmin           |
| cosmwasm | /cosmwasm.wasm.v1.MsgExecuteContract      | MsgExecuteContract      |
| cosmwasm | /cosmwasm.wasm.v1.MsgInstantiateContract2 | MsgInstantiateContract2 |
| cosmwasm | /cosmwasm.wasm.v1.MsgMigrateContract      | MsgMigrateContract      |
| cosmwasm | /cosmwasm.wasm.v1.MsgStoreCode            | MsgStoreCode            |
| cosmwasm | /cosmwasm.wasm.v1.MsgUpdateAdmin          | MsgUpdateAdmin          |

> Code for cosmwasm messages can be found in [cosmos/cosmwasm-stargate/src/cosmwasm.ts](https://github.com/cosmology-tech/sign/blob/main/cosmos/cosmwasm-stargate/src/cosmwasm.ts)
