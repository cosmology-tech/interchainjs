import { Rpc } from "../helpers";
export const createRPCQueryClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => {
  return {
    cosmos: {
      bank: {
        v1beta1: (await import("./bank/v1beta1/query.rpc.Query")).createClientImpl(rpc)
      },
      staking: {
        v1beta1: (await import("./staking/v1beta1/query.rpc.Query")).createClientImpl(rpc)
      }
    }
  };
};