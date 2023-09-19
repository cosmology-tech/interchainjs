/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require("path");
const telescope = require("@cosmology/telescope").default;
const rimraf = require("rimraf").rimrafSync;

const protoDirs = [
  join(__dirname, "/../protos/cosmos-sdk/proto"),
  // join(__dirname, "/../protos/ibc-go/proto"),
  // join(__dirname, "/../protos/ics23/proto"),
  join(__dirname, "/../protos/proto"),
  // join(__dirname, "/../protos/wasmd/proto"),
].map((a) => resolve(a));

const outPath = join(__dirname, "/../src/codegen");
rimraf(outPath);

telescope({
  protoDirs,
  outPath,
  options: {
    removeUnusedImports: true, // testing...
    classesUseArrowFunctions: true,

    tsDisable: {
      patterns: ["**/tx.registry.ts"],
      files: [
        "cosmos/auth/v1beta1/query.ts",
        "cosmos/authz/v1beta1/authz.ts",
        "cosmos/gov/v1/tx.ts",
        "cosmos/gov/v1beta1/gov.ts",
        "cosmos/gov/v1beta1/tx.ts",
      ],
    },

    prototypes: {
      optionalQueryParams: true,
      useOptionalNullable: true,
      fieldDefaultIsOptional: true,

      addTypeUrlToObjects: true,
      addTypeUrlToDecoders: true,
      addAminoTypeToObjects: true,

      // excluded: {
      //   packages: [
      //     "ibc.applications.fee.v1", // issue with parsing protos (LCD routes with nested objects in params)

      //     // 'cosmos.auth.v1beta1',
      //     "cosmos.app.v1alpha1",
      //     "cosmos.app.v1beta1",
      //     "cosmos.base.kv.v1beta1",
      //     "cosmos.base.reflection.v1beta1",
      //     "cosmos.base.snapshots.v1beta1",
      //     "cosmos.base.store.v1beta1",
      //     "cosmos.base.tendermint.v1beta1",
      //     "cosmos.crisis.v1beta1",
      //     "cosmos.evidence.v1beta1",
      //     // "cosmos.feegrant.v1beta1",
      //     "cosmos.genutil.v1beta1",
      //     // "cosmos.group.v1beta1",

      //     // 'cosmos.mint.v1beta1',

      //     "cosmos.autocli.v1",

      //     // "cosmos.group.v1",
      //     "cosmos.msg.v1",
      //     "cosmos.nft.v1beta1",
      //     "cosmos.capability.v1beta1",
      //     "cosmos.orm.v1alpha1",
      //     "cosmos.orm.v1",
      //     "cosmos.slashing.v1beta1",
      //     // "cosmos.vesting.v1beta1",
      //     "google.api",
      //     "ibc.core.port.v1",
      //     "ibc.core.types.v1",
      //   ],
      // },
      parser: {
        keepCase: false,
      },
      typingsFormat: {
        useDeepPartial: true,
        duration: "duration",
        timestamp: "date",
        useExact: false,
      },
    },
    interfaces: {
      enabled: false,
      useUnionTypes: false,
    },
    aminoEncoding: {
      enabled: true,
      useLegacyInlineEncoding: false,
    },
    // lcdClients: {
    //   enabled: true,
    // },
    rpcClients: {
      type: "tendermint",
      enabled: true,
      camelCase: true,
    },
    // packages: {
    //   cosmos: {
    //     authz: {
    //       v1beta1: {
    //         aminoEncoding: {
    //           enabled: false,
    //         },
    //       },
    //     },
    //   },
    // },
  },
})
  .then(() => {
    console.log("✨ all done!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
