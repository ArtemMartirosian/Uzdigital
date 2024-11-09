import  { useState } from 'react';
import {Button,  Spacer, VStack,  Spinner} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle.tsx";
import { ExpirationInput } from "../../components/ExpirationInput/ExpirationInput.tsx";
import { useForm } from "react-hook-form";
import { CardNumberInput } from "../../components/CardNumberInput/CardNumberInput.tsx";
import { useNavigate } from "react-router-dom";
import { mainPaths } from "../../routes/paths/mainPaths.ts";
import request from "../../apis/config/axiosConfig.ts";

export interface IAddCardForm {
    card_number: string;
    expiration: string;
    makeMain?: boolean;
}

const AddCardsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IAddCardForm>({
        defaultValues: {
            card_number: "",
            expiration: "",
            makeMain: false,
        },
    });

    const formatCardNumber = (cardNumber: string) => {
        return cardNumber.replace(/\s+/g, '');
    };

    const formatExpiryDate = (date : string) => {
        const [month, year] = date.split('/');
        const formatted = year + month;
        return formatted;
    };

    const onSubmit = async (formValues: IAddCardForm) => {
        setIsLoading(true)
        try {
            const { card_number, expiration } = formValues;
            const response : any = await request.post('/card/link-payment-card', {
                cardNumber: formatCardNumber(card_number),
                expiryDate: formatExpiryDate(expiration),
            });

            navigate(mainPaths.ApproveCard, {
                state: {
                    cardToken: response.cardToken,
                    smsNotificationNumber: response.smsNotificationNumber,
                    cardNumber: formatCardNumber(card_number),
                    expiryDate: formatExpiryDate(expiration),
                },
            });
        } catch (error) {
            console.error("Error adding card:", error);
            navigate(mainPaths.Cards, {
                state: {
                    cards: true,
                    success: false,
                    error: true,
                },
            });
        } finally {
            setIsLoading(false)
        }

    };

    if (isLoading)
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



    return (
        <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
            <SectionTitle title={t("add_cards_form")} mb="26px" />

            <form id='add-card-form' onSubmit={handleSubmit(onSubmit)}>
                <CardNumberInput control={control} errors={errors} />
                <ExpirationInput control={control} errors={errors} rightElement={false} />
                {/*<Checkbox mt="26px" {...register("makeMain")} colorScheme="blue">*/}
                {/*    <Text textAlign='center' color="darkGrey" fontSize="16px">*/}
                {/*        {t("make_main")}{" "}*/}
                {/*    </Text>*/}
                {/*</Checkbox>*/}
            </form>

            <Spacer />

            <Button form="add-card-form" w="full" type="submit">
                {t("add")}
            </Button>
        </VStack>
    );
};

export default AddCardsPage;
