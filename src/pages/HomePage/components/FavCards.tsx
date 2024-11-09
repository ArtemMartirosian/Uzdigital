import { HStack, useDisclosure } from "@chakra-ui/react";
import FavCard from "../../../components/FavCard/FavCard";
import {
  useFavoriteDeleteMutation,
  useFavoritesGetAllQuery,
} from "../../../apis/PaymentApis/PaymentApis.service";
import { useNavigate } from "react-router-dom";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { IFavorite } from "../../../apis/PaymentApis/PaymentApis.types";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FAVORITE_GETALL } from "../../../constants/queryKeys";

const FavCards = () => {
  const queryClient = useQueryClient();
  const [currentTransactionId, setCurrentTransactionId] = useState<string>("");

  const { mutate: deleteFavorite } = useFavoriteDeleteMutation();

  const onDelete = (id: string) => {
    onOpen();
    setCurrentTransactionId(id);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onAccept = () => {
    deleteFavorite(Number(currentTransactionId), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [FAVORITE_GETALL],
        });
        onClose();
      },
    });
  };

  const { data } = useFavoritesGetAllQuery({ params: {} });
  const navigate = useNavigate();

  const favorites = data?.data || [];

  if (!favorites.length) return null;

  const handleFavoriteClick = (item: IFavorite) => {
    navigate(mainPaths.IDForm, {
      state: {
        amount: item.amount,
        account_id: item.uzdigital_login,
      },
    });
  };

  return (
    <HStack className="no-scrollbar" overflow={"auto"}>
      {favorites.map((item) => (
        <FavCard
          key={item.id}
          amount={item.amount}
          account_id={item.uzdigital_login}
          onClick={() => handleFavoriteClick(item)}
          onDelete={() => onDelete(String(item.favorite_transactions.id))}
        />
      ))}
      <ConfirmModal isOpen={isOpen} onAccept={onAccept} onCancel={onClose} />
    </HStack>
  );
};

export default FavCards;
