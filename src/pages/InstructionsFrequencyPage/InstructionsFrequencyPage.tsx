import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { frequencies } from "../../constants/frequencies";

const InstructionsFrequencyPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle mt={5} title={t("frequency_list")} mb="10px" />

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Td>{t("city")}</Td>
              <Td>{t("frequencies")}</Td>
            </Tr>
          </Thead>
          <Tbody>
            {frequencies.map((item) => (
              <Tr key={item.region}>
                <Td whiteSpace={"normal"} textTransform={"capitalize"}>
                  {t(item.region)}
                </Td>
                <Td>
                  {item.frequencies.map((frequency) => (
                    <Text lineHeight={"22px"} key={frequency}>
                      {frequency}
                    </Text>
                  ))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InstructionsFrequencyPage;
