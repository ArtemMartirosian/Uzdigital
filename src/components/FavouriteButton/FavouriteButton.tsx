import { Button, ButtonProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FavOutlineIcon } from "../../assets/icons/FavOutlineIcon";
import { StarIcon } from "../../assets/icons/StarIcon";

interface IFavouriteButtonProps extends ButtonProps {
  isFav: boolean;
  // isDisabled: boolean;
  onClick: () => void;
}

export const FavouriteButton = ({
  isFav,
  onClick,
  ...props
}: IFavouriteButtonProps) => {
  const { t } = useTranslation();
  const favBtnIcon = isFav ? (
    <StarIcon boxSize="22px" />
  ) : (
    <FavOutlineIcon boxSize="22px" />
  );
  const favBtnText = isFav ? t("saved") : t("add_to_favourites");

  return (
    <Button
      // isDisabled={isDeletingFavorite || isAddingFavorite}
      variant="secondary"
      leftIcon={favBtnIcon}
      onClick={onClick}
      {...props}
    >
      {favBtnText}
    </Button>
  );
};
