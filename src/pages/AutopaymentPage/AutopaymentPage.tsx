import { SectionTitle } from "../../components/SectionTitle/SectionTitle.tsx";
import { AddIcon } from "../../assets/icons/AddIcon.tsx";
import { Box, Spinner, Switch, Text } from "@chakra-ui/react";
import { mainPaths } from "../../routes/paths/mainPaths.ts";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AutopaymentPageIcon } from "../../assets/icons/AutopaymentPageIcon.tsx";
import { GlobeIcon } from "../../assets/icons/GlobeIcon.tsx";
import { PlayIcon } from "../../assets/icons/PlayIcon.tsx";
import { CardSendIcon } from "../../assets/icons/CardSendIcon.tsx";
import { CloseSquareIcon } from "../../assets/icons/CloseSquareIcon.tsx";
import { MessageModal } from "../ApplicationPage/components/MessageModal/MessageModal.tsx";
import AutoPaymentSuccess from "../../assets/images/AutoPaymentSuccess.png";
import AutoPaymentError from "../../assets/images/AutoPaymentError.png";
import { useEffect, useState } from "react";
import request from "../../apis/config/axiosConfig.ts";
import { AutopayIcon } from "../../assets/icons/AutopayIcon.tsx";
import { CalendarIcon } from "../../assets/icons/CalendarIcon.tsx";
import { ClockIcon } from "../../assets/icons/ClockIcon.tsx";
import { CardSmallIcon } from "../../assets/icons/CardSmallIcon.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import {format, Locale, parseISO} from 'date-fns';
import { enUS, ru, uz } from 'date-fns/locale';
import i18n from "i18next";
import { getFormattedTime } from "../../utils/getFormattedTime.ts";
import { getCardData } from "../../store/slices/userSlice.ts";
import { DeleteIcon } from "../../assets/icons/DeleteIcon.tsx";
import DeleteModal from "../MyCardsPage/components/DeleteCardModal.tsx";

type Payment = {
    id: number;
    amount: number;
    isActive: boolean;
    scheduled_date: string;
    tokenId?: string;
    uzDigitalAccountId?: string;
    created_at: string;
    payment_methods: string[];
};

const AutopaymentPage = ()  => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { state } = useLocation();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [deleteModal, setDeleteModal] = useState<any>(0);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.userData);
    const cards = useSelector((state: RootState) => state.user.cardData);

    useEffect(() => {
        if(!window.localStorage.getItem("token")){
            navigate(mainPaths.UnRegistered, { replace: false });
        }
        if (state?.error || state?.success) {
            setIsOpen(true);
        }
        setPayments(cards?.payment_methods?.[0]?.scheduled_payments || []);
        setIsLoading(false);
    }, [state, cards]);

    const deletePayment = async (paymentId: any ) => {
        setIsLoading(true);
        try {
            await request.delete(`/uzdigital/schedule/payment/delete/${paymentId}`);

            // @ts-ignore
            dispatch(getCardData(user.id));
        } catch (error) {
            console.error("Failed to delete payment", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onAddAutoPaymentClick = () => {
        navigate(mainPaths.AddAutopayment);
    };

    const locales: { en: Locale; ru: Locale; uz: Locale } = { en: enUS, ru, uz };

    type LocaleKeys = keyof typeof locales; // 'en' | 'ru' | 'uz'

    const formatDate = (date: string) => {
        const locale = i18n.language as LocaleKeys;

        // Fallback to 'en' if the locale is not one of the supported ones
        const selectedLocale = locales[locale] || locales.en;

        return format(parseISO(date), 'd MMMM', { locale: selectedLocale });
    };

    if (isLoading) {
        return (
            <Spinner
                thickness="6px"
                speed="0.5s"
                emptyColor="purple.200"
                color="activePurple"
                boxSize="50px"
                position="fixed"
                top="calc(50vh - 25px)"
                left="calc(50vw - 25px)"
                zIndex={10}
            />
        );
    }

    // @ts-ignore
    return (
        <Box py="20px">
            <SectionTitle icon={<AddIcon />} title={t("autopayment")} mb="20px" onClick={onAddAutoPaymentClick} />

            {!payments.length && (
                <Box   margin="auto"  mt="50px"   width="288px" borderRadius="22px" background="lightGradient" p="2px">
                   <Box
                       borderRadius="22px"
                       // border="2px solid"
                       width="282px"
                       bg="white"
                       margin="auto"
                       py="20px"
                       display="flex"
                       alignItems="center"
                       flexDirection="column"

                       // sx={{
                       //     borderRadius: "22px",
                       //     borderImage: "linear-gradient(101.27deg, #704BD8 24.87%, #FD005D 96.68%) 1",
                       // }}
                   >
                       <Box>
                           <AutopaymentPageIcon />
                       </Box>
                       <Box mt="10px">
                           <Box display="flex" alignItems="center">
                               <GlobeIcon />
                               <Text ml="8px" color="black" fontSize="15px" fontWeight="400">
                                   {t("payment_in_time")}
                               </Text>
                           </Box>
                           <Box display="flex" alignItems="center" mt="20px">
                               <PlayIcon />
                               <Text ml="8px" color="black" fontSize="15px" fontWeight="400">
                                   {t("channels_available")}
                               </Text>
                           </Box>
                           <Box display="flex" alignItems="center" mt="20px">
                               <CardSendIcon />
                               <Text ml="8px" color="black" fontSize="15px" fontWeight="400">
                                   {t("end_month")}
                               </Text>
                           </Box>
                           <Box display="flex" alignItems="center" mt="20px">
                               <CloseSquareIcon />
                               <Text ml="8px" color="black" fontSize="15px" fontWeight="400">
                                   {t("cancel_any_time")}
                               </Text>
                           </Box>
                           <Text
                               onClick={onAddAutoPaymentClick}
                               align="center"
                               mt="20px"
                               bgGradient="linear(101.27deg, #704BD8 24.87%, #FD005D 96.68%)"
                               backgroundClip="text"
                               fontWeight="700"
                               fontSize="16px"
                               cursor='pointer'
                               _hover={{ color: 'text'}}
                           >
                               {t("add_autopayment")}
                           </Text>
                       </Box>
                   </Box>
               </Box>
            )}

            {payments.map((item) => {
                const handleToggle = async (item: Payment) => {
                    navigate(mainPaths.Autopayment, { replace: true });
                    try {
                        await request.put(`/uzdigital/schedule/update/${user?.id}/${item.tokenId}`, {
                            isActive: !item.isActive,
                        });
                        // @ts-ignore
                        dispatch(getCardData(user?.id));
                    } catch (error) {
                        console.error("Failed to update payment status", error);
                    }
                };

                // @ts-ignore
                // @ts-ignore
                return (
                    <Box key={item.id} width="95%" height="150px" p="12px" borderRadius="18px" border="1px solid #DBE2E9">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box display="flex">
                                <AutopayIcon />
                                <Box ml="10px">
                                    <Text fontWeight="400" color="darkgray">
                                        ID: {item?.uzDigitalAccountId}
                                    </Text>
                                    <Text fontWeight="600" color="black">
                                        {item.amount} UZS
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <DeleteIcon cursor='pointer' onClick={() => setDeleteModal(item)} mr='16px'/>
                                <Switch
                                    colorScheme="teal"
                                    size="lg"
                                    isChecked={item.isActive}
                                    onChange={() => handleToggle(item)}
                                />
                            </Box>
                        </Box>
                        <Box mt="18px" display="flex" justifyContent="space-between">
                            <Box width="30%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="64px" borderRadius="10px" bg="palePurple">
                                <CalendarIcon />
                                <Text fontWeight="500" mt='2p' lineHeight='11px' textAlign='center' fontSize="14px" color="black">
                                    {formatDate(item.created_at)}
                                </Text>
                            </Box>
                            <Box width="30%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="64px" borderRadius="10px" bg="palePurple">
                                <ClockIcon />
                                <Text fontWeight="500" fontSize="14px" color="black">
                                    {getFormattedTime(item.created_at)}
                                </Text>
                            </Box>
                            <Box width="30%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="64px" borderRadius="10px" bg="palePurple">
                                <CardSmallIcon />
                                <Text fontWeight="500" fontSize="14px" color="black">

                                    {
                                        // @ts-ignore
                                        `**** ${cards?.payment_methods?.[0]?.cardNumber?.slice(-4) || ''}`
                                    }

                                </Text>
                            </Box>
                        </Box>
                    </Box>
                );
            })}

                <MessageModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={state?.error ? t("mistake") : t("successfully")}
                    subtitle={state?.error ? t("try_again_autopayment") : t("success_description")}
                    isSuccess={true}
                    icon={state?.error ? AutoPaymentError : AutoPaymentSuccess}
                />

                <DeleteModal
                    subTitle={`${t("sure_to_delete_autopayment")} ID: ${deleteModal?.uzDigitalAccountId}`}

                    title={t("delete_autopayment")}
                    subTitleNumber=''
                    isOpen={deleteModal}
                    onAccept={() => {
                        deletePayment(deleteModal?.id)
                        setDeleteModal(0)
                    } }
                    onCancel={() => setDeleteModal(0) }
                    acceptBtnTitle={t("delete")}
                />


            </Box>
        );
    };

export default AutopaymentPage;
