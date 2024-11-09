import { Box, Center, Flex, FlexProps, Text } from "@chakra-ui/react";
import { StarIcon } from "../../assets/icons/StarIcon";
import { priceFormat } from "../../utils/priceFormat";
import MoreButton from "./MoreButton";

interface IFavCardProps extends FlexProps {
  amount: number;
  account_id: string;
  onDelete: () => void;
}

const FavCard: React.FC<IFavCardProps> = ({
  amount,
  account_id,
  onDelete,
  ...props
}) => {
  return (
    <Flex
      cursor="pointer"
      maxW="222px"
      borderRadius="16px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="inputGrey"
      bg="white"
      flexShrink={0}
      p={2.5}
      gap={2.5}
      justifyContent="space-between"
      transition="200ms"
      {...props}
      // _hover={{
      //   borderRadius: "16px",
      //   borderImage: "linear-gradient(180deg, #FFCE8E 0%, #F3A33D 100%) 30",
      // }}
    >
      <Center borderRadius="10px" bg="lightGrey" p="9px">
        <StarIcon />
      </Center>
      <Box>
        <Text color="darkGrey">ID: {account_id}</Text>
        <Text color="black" fontSize="md" fontWeight={600}>
          {priceFormat(String(amount))} UZS
        </Text>
      </Box>
      <MoreButton onDelete={onDelete} />
    </Flex>
  );
};

export default FavCard;
