import {SectionTitle} from "../../../../components/SectionTitle/SectionTitle.tsx";

import {Box, Button, Spacer, Switch, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {AutopayIcon} from "../../../../assets/icons/AutopayIcon.tsx";
import {DeleteIcon} from "../../../../assets/icons/DeleteIcon.tsx";
import DeleteModal from "../../../MyCardsPage/components/DeleteCardModal.tsx";
import {useLocation} from "react-router-dom";
import Card from "../../../MyCardsPage/components/Card.tsx";

const DetailAutoPayment = () => {

    const {t} = useTranslation();
    const {state} = useLocation();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onAccept = () => {
        onClose()
    };

    const onDelete = () => {
        onOpen();
    };

    return (
        <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
            <SectionTitle  title={t("autopayment_details")} mb="20px"  />

            <Box width="100%" height="150px" p="12px" borderRadius="18px" bg='lightGrey' border="1px solid #DBE2E9">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex">
                        <AutopayIcon />
                        <Box ml="10px">
                            <Text fontWeight="400" color="darkgray">
                                ID: {state?.item?.uzDigitalAccountId}
                            </Text>
                            <Text fontWeight="600" color="black">
                                {state?.item?.amount} UZS
                            </Text>
                        </Box>
                    </Box>
                    <Switch
                        colorScheme="teal"
                        size="lg"
                        // isChecked={item.isActive}
                        // onChange={() => handleToggle(item)}
                    />
                </Box>
                <Box mt="18px" >
                    <Box width='100%' display='flex' justifyContent="space-between">
                        <Text color='mainGrey' fontWeight="400" fontSize="16px">
                            {t("conected")}
                        </Text>
                        <Text color='black' fontWeight="400" fontSize="14px">
                            {state?.item?.created_at}
                        </Text>
                    </Box>
                    <Box width='100%' mt='10px' display='flex' justifyContent="space-between">
                        <Text color='mainGrey' fontWeight="400" fontSize="16px">
                            {t("write_off")}
                        </Text>
                        <Text color='black' fontWeight="400" fontSize="16px">
                            4 марта 2024, 10:00
                        </Text>
                    </Box>
                </Box>
            </Box>

            <SectionTitle mt='30px'  title={t("write_off_card")} mb="20px"  />

            <Card item={state.card?.[0]} canManage={false}  />

            <Spacer />

           <Box display='flex' justifyContent='space-between'>
               <Button
                   w="48%"
                   type="submit"
                   bg='white'
                   borderWidth='1px'
                   border='inputGrey'
                   color='error'
                   onClick={() => onDelete()}
               >
                   <DeleteIcon/>
                   <Text ml='6px'>
                       {t("delete")}
                   </Text>

               </Button>
               <Button
                   width='48%'
                   type="submit"
               >
                   {t("change")}
               </Button>
           </Box>

            <DeleteModal
                subTitle={t("sure_to_delete_autopayment")}
                title={t("delete_autopayment")}
                subTitleNumber=''
                isOpen={isOpen}
                onAccept={onAccept}
                onCancel={onClose}
                acceptBtnTitle={t("delete")}
            />

        </VStack>
    );
};

export default DetailAutoPayment;