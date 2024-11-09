import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { ArrowDown } from "../../../assets/icons/ArrowDown";
import { useFaqGetAllQuery } from "../../../apis/FAQ.sevice";

export const FAQ = () => {
  const { data: faq } = useFaqGetAllQuery();
  const faqList = faq?.data || [];

  return (
    <>
      <Accordion allowToggle>
        {faqList.map((faq, i) => (
          <AccordionItem
            borderTop={"none"}
            borderBottom={"1px solid #E8EEF7"}
            key={i}
          >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton cursor="pointer" gap="8px">
                    <Box
                      color={isExpanded ? "buttonPurple" : ""}
                      fontWeight={isExpanded ? "600" : ""}
                      as="span"
                      flex="1"
                      textAlign="left"
                    >
                      {faq.question}
                    </Box>
                    <AccordionIcon as={ArrowDown} />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  sx={{
                    "& a": {
                      color: "activePurple",
                      textDecoration: "underline",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: faq.answer,
                  }}
                />
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
