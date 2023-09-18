import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
} from "@chakra-ui/react";
import loadable from "@loadable/component";
import { Coin, GasPrice } from "@sign/cosmos";
import React from "react";

const ReactJson = loadable(() => import("react-json-view"));

export const ModalTxView = ({
  msgs,
  gas,
  fee,
  gasPrice,
  onClick,
}: {
  msgs: object[];
  gas: string;
  fee: Coin;
  gasPrice: GasPrice;
  onClick: () => void;
}) => {
  return (
    <ModalContent>
      <ModalHeader>Transaction</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Heading as="h6" size="xs" marginBottom={5}>
          Messages
        </Heading>
        <ReactJson
          src={msgs}
          iconStyle="square"
          displayDataTypes={false}
          enableClipboard={false}
          displayObjectSize={false}
          collapseStringsAfterLength={60}
        />
        <Heading as="h6" size="xs" marginY={5}>
          Estimated Fee
        </Heading>
        <Stack direction="row">
          <Code colorScheme="green" children={`${gas} gas`} />
          <Code
            colorScheme="yellow"
            children={`~ ${fee?.amount ?? "--"} ${fee?.denom ?? ""}`}
          />
          <Text fontSize="xs" color="grey">
            {`(1 gas = ${gasPrice.amount} ${gasPrice.denom})`}
          </Text>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="twitter"
          size={"sm"}
          rightIcon={<ArrowForwardIcon />}
          onClick={onClick}
        >
          Sign & Broadcast
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
