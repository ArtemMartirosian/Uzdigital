import {SectionTitle} from "../../components/SectionTitle/SectionTitle.tsx";
import {Box, Spinner, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {AddIcon} from "../../assets/icons/AddIcon.tsx";
import {mainPaths} from "../../routes/paths/mainPaths.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {NoCardIcon} from "../../assets/icons/NoCardIcon.tsx";
import {MessageModal} from "../ApplicationPage/components/MessageModal/MessageModal.tsx";
import {useEffect, useState} from "react";
import Card from "./components/Card.tsx";
import CardSuccess from "../../assets/images/cardSuccess.png";
import CardError from "../../assets/images/cardError.jpg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {getCardData} from "../../store/slices/userSlice.ts";
import Navbar from "../HomePage/components/Navbar.tsx";

const MyCardsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const { state } = useLocation();
    const cards = useSelector((state: RootState) => state?.user.cardData);
    const user = useSelector((state: RootState) => state?.user?.userData);
    const dispatch = useDispatch()

    const {loading} = useSelector((state: RootState) => state?.user);

    const onAddCardClick = () => {
        navigate(mainPaths.AddCards);
    };

    useEffect(() => {
        if(state?.error || state?.success){
            setIsOpen(true)
        }
        // @ts-ignore
        dispatch(getCardData(user?.id))

    }, [])


    if (loading)
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
        <Box py="20px">
            <SectionTitle
                icon={ <AddIcon/>}
                title={t("my_cards")}
                mb="20px"
                onClick={onAddCardClick}
            />
            {
                    <MessageModal
                        isOpen={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                            navigate(location.pathname, { replace: true });
                        }}
                        title={ state?.error ? t("card_error") :  t("card_added")}
                        isSuccess={true}
                        icon={state?.error ? CardError :  CardSuccess}
                    />
            }
            {
                !cards?.payment_methods?.length && (
                    <Box display="flex" mt="90px" justifyContent="center" flexDirection="column" alignItems='center'>
                        <NoCardIcon/>
                        <Text fontSize="16px" color='darkGrey'  fontWeight="400" >
                            {t("dont_have_cards_yet")}
                        </Text>
                        <Text   _hover={{ color: 'text'}}   cursor='pointer' onClick={onAddCardClick} fontSize="16px" color='activePurple' mt="8px" fontWeight="700" >
                            {t("add_card")}
                        </Text>

                    </Box>
                )
            }
            {
                cards?.payment_methods?.map((item) => {
                    // @ts-ignore
                    return <Card item={item}/>
                } )

            }

            <Navbar/>

        </Box>
    );
};

export default MyCardsPage;