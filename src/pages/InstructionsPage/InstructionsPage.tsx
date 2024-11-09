import { Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useInstructionsGetAllQuery } from "../../apis/Instructions.sevice";
import { Chart } from "../../assets/icons/Chart";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../routes/paths/mainPaths";
import InstructionCard from "./components/InstructionCard";
import { TaskSquare } from "../../assets/icons/TaskSquare";

const InstructionsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: files } = useInstructionsGetAllQuery();

  return (
    <>
      <SectionTitle title={t("home_page.instructions")} mt="5" mb={2.5} />
      <InstructionCard
        icon={<Chart />}
        title={t("frequency_list")}
        onClick={() => navigate(mainPaths.InstructionsFrequency)}
      />
      <Stack my={3.5} spacing={3.5}>
        {files?.data?.map((file) => (
          <InstructionCard
            key={file.id}
            icon={<TaskSquare />}
            title={file.title}
            downloadLink={file.file}
          />
        ))}
      </Stack>
    </>
  );
};

export default InstructionsPage;
