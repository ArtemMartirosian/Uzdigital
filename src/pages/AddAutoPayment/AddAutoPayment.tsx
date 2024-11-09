import { Box, Button, VStack, Spacer } from "@chakra-ui/react";
import { AccountIdInput } from "../../components/AccountIdInput/AccountIdInput.tsx";
import { AmountInput } from "../../components/AmountInput/AmountInput.tsx";
import { useForm } from "react-hook-form";
import { IIDForm } from "../IDFormPage/IDFormPage.tsx";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle.tsx";
import { useState} from "react";
import {SuccessTable} from "../../assets/icons/SuccessTable.tsx";
import request from "../../apis/config/axiosConfig.ts";
import {useNavigate} from "react-router-dom";
import {mainPaths} from "../../routes/paths/mainPaths.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {SmallCardIcon} from "../../assets/icons/SmallCardIcon.tsx";
import {Text} from "@chakra-ui/layout";
import Card from "../MyCardsPage/components/Card.tsx";
import {PaymentMethod} from "../../store/slices/userSlice.ts";

const AddAutoPayment = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const cards = useSelector((state: RootState) => state?.user.cardData);
    const user = useSelector((state: RootState) => state?.user?.userData);
    const [selectedForm, setSelectedForm] = useState<string>("details");
    const [isDetailsSubmitted, setIsDetailsSubmitted] = useState<boolean>(false);
    const [loading , setLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        getValues,
    } = useForm<IIDForm>({
        defaultValues: {
            account_id: "",
            amount: "",
        },
    });

    const onSubmit = () => {
        if (selectedForm === "details") {
            setIsDetailsSubmitted(true);
            setSelectedForm("card");
        }
        if ( selectedForm === "card"){
            setLoading(true)

            request.post('/otp/send',{phoneNumber : user?.phone},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,  // This ensures credentials like cookies are sent
                }
            )
                .then(() => {
                    navigate(mainPaths.AutopaymentOtp , {
                        state : {
                            phoneNumber: user?.phone,
                            userId: user?.id,
                            tokenId: + (cards?.payment_methods?.[0] as PaymentMethod)?.id,
                            uzDigitalAccountId: +getValues("account_id"),
                            amount: +getValues("amount"),
                            isActive: true,
                            day: new Date().getDate(),
                            month: new Date().getMonth() + 1,
                        }
                    });

                })
                .catch(error => {
                    console.error('Error:', error);
                }).finally(() => {
                setLoading(false)
            } )
        }

    };


    return (
        <VStack py={5} pb={10} gap={0} h="full" alignItems="stretch">
            <SectionTitle title={t("new_autopayment")} mb={6} />

            <Box
                bg="#F7F9FB" // Light grey background
                borderRadius="full"
                p={1} // Padding of 5px
                display="inline-flex"
                mb={6}
            >
                <Button
                    flex={1}
                    borderRadius="full"
                    bg={selectedForm === "details" ? "white" : "transparent"}
                    color={selectedForm === "details" ? "black" : "mainGrey"}
                >
                    {isDetailsSubmitted && (
                        <SuccessTable/>
                    )}
                    {t("details")}

                </Button>
                <Button
                    flex={1}
                    borderRadius="full"
                    bg={selectedForm === "card" ? "white" : "transparent"}
                    color={selectedForm === "card" ? "black" : "mainGrey"}
                >
                    {t("card")}
                </Button>
            </Box>

            {/* Conditionally render forms based on the selected radio button */}
            {selectedForm === "details" && (
                <form style={{width : "300px"}} id="id-form-details" onSubmit={handleSubmit(onSubmit)}>
                    <AccountIdInput errors={errors} register={register} />
                    <AmountInput errors={errors} control={control} />
                </form>
            )}

            {selectedForm === "card" && (
                <form id="id-form-card" onSubmit={handleSubmit(onSubmit)} >
                    <Box width='100%' display='flex' justifyContent='space-between'>
                        <SectionTitle title={t("write_off_card")} mb={6}  />
                        {
                            !cards?.payment_methods?.[0] &&  <Box onClick={() => navigate(mainPaths.AddCards)} display='flex' alignItems='center'>
                                <SmallCardIcon/>
                                <Text   _hover={{ color: 'text'}} cursor='pointer' fontSize='15px' ml='4px' fontWeight='500' color='activePurple' >
                                    {t("another_card")}
                                </Text>
                            </Box>
                        }

                    </Box>
                    {
                        cards?.payment_methods?.[0] && (
                            <Card item={cards?.payment_methods?.[0]} canManage={false}  />
                        )
                    }

                    {/*<Swiper*/}
                    {/*    slidesPerView={1.5}*/}
                    {/*    spaceBetween={10}*/}
                    {/*    navigation*/}
                    {/*    pagination={{ clickable: true }}*/}
                    {/*    scrollbar={{ draggable: true }}*/}
                    {/*    style={{display : "flex"}}*/}
                    {/*>*/}
                    {/*    {cards?.payment_methods?.map((item, index) => (*/}
                    {/*        <SwiperSlide  key={index}>*/}
                    {/*            <Box onClick={() => setSelectedCard(item) } borderRadius='16px'  width='204px' height='124px' border={selectedCard?.id === item?.id && "1px solid purple"} padding='1px'>*/}
                    {/*                <CardSmall item={item} />*/}
                    {/*            </Box>*/}
                    {/*        </SwiperSlide>*/}
                    {/*    ))}*/}
                    {/*</Swiper>*/}
                </form>
            )}

            <Spacer />

            <Button
                form={selectedForm === "details" ? "id-form-details" : "id-form-card"}
                w="full"
                type="submit"
                onClick={handleSubmit(onSubmit)}

                isLoading={loading}

                isDisabled={
                    (selectedForm === "card" && !cards?.payment_methods?.[0]) || Object.keys(errors).length !== 0
                }
            >
                {selectedForm === "card" ? t("create") : t("next")}
            </Button>
        </VStack>
    );
};

export default AddAutoPayment;
