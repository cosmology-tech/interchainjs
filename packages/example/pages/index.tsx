import { RepeatIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
  ListItem,
  Modal,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Auth, Secp256k1Auth } from "@sign/core";
import { Coin, Server, TxResponse } from "@sign/cosmos";
import { stargateSigner } from "@sign/cosmos-const";
import { QueryClientImpl as Bank } from "interchain-query/cosmos/bank/v1beta1/query.rpc.Query";
import { useCallback, useEffect, useState } from "react";

import { cosmoshubAddress, mnemonic } from "../../../test-data";
import { ModalReceiptView, ModalTxView } from "../components";

const sendMsgs = [
  {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      amount: [
        {
          amount: "1",
          denom: "uatom",
        },
      ],
      fromAddress: cosmoshubAddress,
      toAddress: cosmoshubAddress,
    },
  },
];

// const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";
// const rpcEndpoint = "https://cosmos-rpc.quickapi.com:443";
const rpcEndpoint = "https://rpc.cosmos.directory/cosmoshub";

const auth: Auth = Secp256k1Auth.fromMnemonic(mnemonic);
stargateSigner.on(rpcEndpoint).by(auth);
const gasPrice = stargateSigner.getGasPrice("cosmoshub-4");

export default function Page() {
  const [modalView, setModeView] = useState<"tx" | "receipt">("tx");

  const [balance, setBalance] = useState<Coin>();
  const [fee, setFee] = useState<Coin>();
  const [gas, setGas] = useState<string>("--");
  const [receipt, setReceipt] = useState<TxResponse>();

  const updateBalance = useCallback(async () => {
    const query = new Server(rpcEndpoint);
    const resp = await query
      .about(Bank)
      .balance({ address: cosmoshubAddress, denom: "uatom" });
    setBalance(resp.balance);
  }, []);

  const updateFee = useCallback(async () => {
    const resp = await stargateSigner.estimateFee({ msgs: sendMsgs });
    setFee(resp.amount[0]);
    setGas(resp.gasLimit.toString());
  }, []);

  useEffect(() => {
    updateBalance();
  }, []);

  const openModal = useCallback(() => {
    setModeView("tx");
    onOpen();
    updateFee();
  }, []);

  const signAndBroadcast = useCallback(async () => {
    setModeView("receipt");
    const resp = await stargateSigner.sign({ msgs: sendMsgs }).broadcast();
    setReceipt(resp);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tabs variant="enclosed" colorScheme="teal" marginY={10} marginX={100}>
      <TabList>
        <Tab>MsgSend</Tab>
        <Tab>MsgStake</Tab>
        <Tab>MsgVote</Tab>
        <Tab>MsgIBC</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Stack direction="row" marginTop={2} marginBottom={8}>
            <Code colorScheme="teal" children={cosmoshubAddress} />
            <Code
              colorScheme="yellow"
              children={`${balance?.amount ?? "--"} ${balance?.denom ?? ""}`}
            />
            <RepeatIcon
              onClick={updateBalance}
              _hover={{ cursor: "pointer" }}
              color="gray"
            />
          </Stack>
          <UnorderedList>
            <ListItem>
              <Stack direction="row" marginTop={5}>
                <Text fontSize="l">Send 1 uatom to self</Text>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  size="xs"
                  onClick={openModal}
                >
                  Send
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                  <ModalOverlay />
                  {modalView === "tx" ? (
                    <ModalTxView
                      msgs={sendMsgs}
                      gas={gas}
                      fee={fee}
                      gasPrice={gasPrice}
                      onClick={signAndBroadcast}
                    />
                  ) : (
                    <ModalReceiptView receipt={receipt} />
                  )}
                </Modal>
              </Stack>
            </ListItem>
          </UnorderedList>
        </TabPanel>
        <TabPanel>
          <p>MsgStake!</p>
        </TabPanel>
        <TabPanel>
          <p>MsgVote!</p>
        </TabPanel>
        <TabPanel>
          <p>MsgIBC!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
