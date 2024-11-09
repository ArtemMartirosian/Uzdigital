import {
  Button,
  GridItem,
  Image,
  Input,
  ScaleFade,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { AddPhoto } from "../../../../assets/icons/AddPhoto";
import { Close } from "../../../../assets/icons/Close";

interface IImageGridProps {
  photos: File[];
  setPhotos: (photos: File[]) => void;
}

export const ImageGrid = ({ photos, setPhotos }: IImageGridProps) => {
  const { t } = useTranslation();

  const onRemovePhoto = (index: number) => {
    const newPhotos = [...photos!];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const onChooseImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setPhotos(Array.from(files!));
  };

  return (
    <>
      <SimpleGrid columns={4} spacing="8px">
        {!!photos?.length &&
          photos?.map((photo, index) => (
            <ScaleFade in key={index} initialScale={0.5}>
              <GridItem
                key={`${photo.name}-${index}`}
                borderWidth="1px"
                borderStyle="solid"
                borderColor="purple.400"
                borderRadius="12px"
                position="relative"
                overflow="hidden"
                h="76px"
                _dark={{ borderColor: "gray.600" }}
              >
                <Image
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  src={URL.createObjectURL(photo)}
                  alt={`Support Photo ${index + 1}`}
                />
                <Button
                  aria-label="Delete"
                  onClick={() => onRemovePhoto(index)}
                  position="absolute"
                  top="0px"
                  right="0px"
                  p="0px"
                  px="0px"
                  minW="fit-content"
                  borderRadius="0 0 0 8px"
                  bg="purple.400"
                  boxSize="22px"
                  _dark={{ bg: "gray.600" }}
                >
                  <Close _dark={{ stroke: "customWhite" }} />
                </Button>
              </GridItem>
            </ScaleFade>
          ))}
      </SimpleGrid>
      <Button
        cursor={photos?.length === 4 ? "not-allowed" : "pointer"}
        as="label"
        leftIcon={<AddPhoto />}
        variant="add"
        alignSelf="start"
        isDisabled={photos?.length === 4}
        w={"min-content"}
        htmlFor={photos?.length === 4 ? "" : "support_photo"}
        color={"activePurple"}
      >
        {t("add_photo")}
      </Button>
      <Input
        multiple
        type="file"
        id="support_photo"
        name="support_photo"
        accept="image/png, image/jpeg"
        visibility="hidden"
        opacity="0"
        display="none"
        onChange={onChooseImages}
      />
    </>
  );
};
