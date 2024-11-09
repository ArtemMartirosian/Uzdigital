import { Box, Image } from "@chakra-ui/react";
import { useBannerGetAllQuery } from "../../../apis/Banner.sevice";
import useTelegram from "../../../hooks/useTelegram";

const Banner = () => {
  const { tg } = useTelegram();
  const { data } = useBannerGetAllQuery();
  const banner = data?.data?.[0];
  const img = import.meta.env.VITE_BASE_URL + "/media/" + banner?.image;

  const onClick = () => {
    tg.openLink(banner?.url || "");
  };

  return (
    <Box mb="18px" width="full" h="140px" pos={"relative"} onClick={onClick}>
      <Image
        src={img}
        alt={banner?.title}
        borderRadius="18px"
        objectFit="cover"
        pos={"absolute"}
        top={0}
        left={0}
        w={"full"}
        h={"full"}
      />
    </Box>
  );
};
export default Banner;
