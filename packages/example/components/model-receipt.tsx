import {
  Center,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@chakra-ui/react";
import loadable from "@loadable/component";
import { TxResponse } from "@sign/cosmos";
import React from "react";

const ReactJson = loadable(() => import("react-json-view"));

export const ModalReceiptView = ({ receipt }: { receipt?: TxResponse }) => {
  if (receipt == void 0) {
    return (
      <ModalContent>
        <ModalHeader>Sign & Broadcast</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center minH={300}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
          </Center>
        </ModalBody>
      </ModalContent>
    );
  }
  return (
    <ModalContent>
      <ModalHeader>Sign & Broadcast</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Heading as="h6" size="xs" marginBottom={5}>
          Response of Broadcasting
        </Heading>
        <ReactJson
          src={receipt}
          iconStyle="square"
          displayDataTypes={false}
          enableClipboard={false}
          displayObjectSize={false}
          collapseStringsAfterLength={60}
        />
      </ModalBody>
    </ModalContent>
  );
};
