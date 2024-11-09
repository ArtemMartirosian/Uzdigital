import { Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { AddApplication } from "../../../assets/icons/AddApplication";

const EmptyList = () => {
  return (
    <Grid
      gridTemplateRows={"1fr auto 1fr"}
      h={"calc(100vh - 120px)"}
      gap={2}
      justifyItems={"center"}
    >
      <AddApplication alignSelf={"end"} />

      <Text color={"darkGrey"} maxW={"225px"} textAlign={"center"}>
        Отправьте заявку на подключение онлайн
      </Text>
      <Text
        alignSelf={"start"}
        fontWeight={700}
        color={"activePurple"}
        as={Link}
        to={mainPaths.ApplicationForm}
      >
        Новая заявка
      </Text>
    </Grid>
  );
};

export default EmptyList;
