import { HistoryDTO } from "@dtos/historyDTO";
import { Heading, HStack, Text, VStack } from "native-base";

type Props = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: Props) {
  return (
    <HStack
      w={"full"}
      px={5}
      py={4}
      mb={3}
      bg={"gray.600"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <VStack mr={5} color={"white"} fontSize={"sm"} flex={1}>
        <Heading
          color={"white"}
          fontSize={"md"}
          textTransform={"capitalize"}
          numberOfLines={1}
          fontFamily={"heading"}
        >
          {data.name}
        </Heading>
        <Text color={"gray.100"} fontSize={"lg"} numberOfLines={1}>
          {data.group}
        </Text>
      </VStack>
      <Text color={"gray.300"} fontSize={"md"}>
        {data.hour}
      </Text>
    </HStack>
  );
}
