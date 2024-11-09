import {FC, useState} from 'react';
import {Box, Image, Text, useDisclosure} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import DeleteModal from "./DeleteCardModal.tsx";

import cardLogo from "../../../assets/images/card.png"
import cardLogo2 from "../../../assets/images/card2.png"
import request from "../../../apis/config/axiosConfig.ts";
import {MessageModal} from "../../ApplicationPage/components/MessageModal/MessageModal.tsx";
import FailImg from '../../../assets/images/FailFeedback.png';
import {useDispatch, useSelector} from "react-redux";
import {getCardData} from "../../../store/slices/userSlice.ts";
import {RootState} from "../../../store/store.ts";
import {DeleteWhiteIcon} from "../../../assets/icons/DeleteWhiteIcon.tsx";

interface CardItem {
    id: number;
    cardImg: string;
    cardNumber: string;
    processingType: string;
    name: string;
    surName: string;
    expiryDate: string;
}

interface CardProps {
    item: CardItem | any;
    canManage?: boolean;
    payment_methods?: string[];
}

const Card: FC<CardProps> = ({item , canManage = true}) => {

    const { t } = useTranslation();
    const [errorModal , setErrorModal] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state?.user?.userData);


    const { isOpen, onOpen, onClose } = useDisclosure();

    const deleteCard = async (cardId : number) => {
        try {
            await request.delete(`/card/${cardId}`);
            // @ts-ignore
            dispatch(getCardData(user?.id))
            window.location.reload();
        } catch (error) {
            setErrorModal(true)
            console.error("Error deleting card:", error);
        }
    };

    const onAccept = () => {
        onClose()
        deleteCard(item.id)


    };

    function formatDate(dateStr : string) {
        if (dateStr.length !== 4) {
            return dateStr; // Return original if it's not a 4-character string
        }

        const day = dateStr.slice(0, 2);
        const month = dateStr.slice(2, 4);

        return `${month}/${day}`;
    }

    const onDelete = () => {
        onOpen();
    };



    return (
        <Box key={item.id} position='relative' pb='14px'  borderRadius='lg' overflow='hidden'>
            <Image src={item?.processingType === "UZCARD" ? cardLogo : cardLogo2} alt="Card Background" objectFit='cover' w='100%' h='100%' />
            <Box position='absolute' top='12%' left='6%' right='6%' bottom='15%'>

                {/*<Box position='absolute' px="7px" py="1px" borderRadius='30px' bg='white' top='0' left='15%' >*/}
                {/*    <Text  fontSize='12px' color='activePurple'>*/}
                {/*        {t("main")}*/}
                {/*    </Text>*/}
                {/*</Box>*/}


                <Text position='absolute' fontSize='20px'  bottom='20%' color='white' >
                    {item.cardNumber.replace(/(.{4})/g, '$1 ').trim()}
                </Text>
                {
                    canManage && (
                        <Box  position='absolute' right='0' top='0' >
                            <DeleteWhiteIcon cursor='pointer' onClick={() => onDelete()} />
                            {/*{*/}
                            {/*    showActionModal && (*/}
                            {/*        <Box  width='122px'  height='84px' bg='white' left='-110px' bottom='-70px'  borderRadius="12px" position='absolute' >*/}
                            {/*            <Box onClick={() => {setShowActionModal(false)}} display='flex' py='10px' px='12px'  >*/}
                            {/*                <StarIcon/>*/}
                            {/*                <Text ml='6px' textTransform='capitalize'  >{t("main")}</Text>*/}
                            {/*            </Box>*/}
                            {/*            <Box onClick={() => onDelete()} display='flex' py='10px' px='12px'>*/}
                            {/*                <DeleteIcon/>*/}
                            {/*                <Text ml='6px' color="error"  >{t("delete")}</Text>*/}
                            {/*            </Box>*/}
                            {/*        </Box>*/}
                            {/*    )*/}
                            {/*}*/}
                        </Box>
                    )
                }
                <Box position='absolute' fontSize='16px' bottom='0' left='0'>
                    <Text fontSize='md' color='white'>
                        {item.name} {item.surName}
                    </Text>
                </Box>
                <Box position='absolute' fontSize='16px' bottom='0' right='0'>
                    <Text fontSize='md' color='white'>
                        {formatDate(item.expiryDate)}
                    </Text>
                </Box>
            </Box>

            <DeleteModal
                subTitle={t("sure_delete_card")}
                subTitleNumber={item.cardNumber.replace(/(.{4})/g, '$1 ').trim()}
                title={t("remove_card")}
                isOpen={isOpen}
                onAccept={onAccept}
                onCancel={onClose}
                acceptBtnTitle={t("delete")}
            />

            <MessageModal
                isOpen={errorModal}
                onClose={() => setErrorModal(false)}
                title={t("mistake")}
                subtitle={ t("try_again_autopayment")}
                isSuccess={true}
                icon={FailImg}
            />
        </Box>
    );
};

export default Card;