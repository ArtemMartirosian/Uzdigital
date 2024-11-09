
import {Box, Spinner, useDisclosure} from "@chakra-ui/react";
import {SectionTitle} from "../../components/SectionTitle/SectionTitle.tsx";
import {useTranslation} from "react-i18next";
import LanguageDrawer from "../SettingsPage/components/LanguageDrawer.tsx";
import Option from "../SettingsPage/components/Options.tsx";
import {Question} from "../../assets/icons/Question.tsx";
import {OffertIcon} from "../../assets/icons/OffertIcon.tsx";
import {mainPaths} from "../../routes/paths/mainPaths.ts";
import {useNavigate} from "react-router-dom";
import {MyCardsIcon} from "../../assets/icons/MyCardsIcon.tsx";
import ProfileOptions from "./components/ProfileOptions.tsx";
import {UserPurpleIcon} from "../../assets/icons/UserPurpleIcon.tsx";
import Navbar from "../HomePage/components/Navbar.tsx";
import DeleteModal from "../MyCardsPage/components/DeleteCardModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useEffect, useState} from "react";
import {getCardData, getUserData} from "../../store/slices/userSlice.ts";

const AccountPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(true)
    const { isOpen, onClose } = useDisclosure();
    const user = useSelector((state: RootState) => state?.user?.userData);
    const dispatch = useDispatch()

    const onAboutServiceOptionClick = () => {
        navigate(mainPaths.About);
    };
    const onCardsClick = () => {
        navigate(mainPaths.Cards);
    };

    const onAccept = () => {
        onClose()
        navigate(mainPaths.ResetPassword);
    };

    useEffect(() => {
        // @ts-ignore
        dispatch(getUserData())
    }, []);

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate(mainPaths.UnRegistered);
        }
        // @ts-ignore

        if(!user?.id){
            // @ts-ignore
            dispatch(getCardData(user.id)).then(() => setIsLoading(false) )
        } else {
            setIsLoading(false)
        }


    }, [user])



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
        <Box py="20px">
            <SectionTitle
                title={t("account")}
                mb="20px"
            />

            <ProfileOptions
                icon={<UserPurpleIcon />}
                subTitle={t("profile")}
                title={`${user?.phone}`}
            />

            <Option
                mt='30px'
                onClick={onCardsClick}
                icon={<MyCardsIcon />}
                title={t("my_cards")}
                bordered
            />
            {/*<Option*/}
            {/*    onClick={onChangePassword}*/}
            {/*    icon={<PasswordKeyIcon />}*/}
            {/*    title={t("change_password")}*/}
            {/*    bordered*/}
            {/*/>*/}

            <LanguageDrawer />
            <Option
                onClick={onAboutServiceOptionClick}
                icon={<Question />}
                title={t("about_service")}
                bordered
            />
            <Option
                onClick={onAboutServiceOptionClick}
                icon={<OffertIcon />}
                title={t("offert")}
                bordered
            />


            <DeleteModal
                subTitle={t("we_send_code")}
                subTitleNumber='+998 (90) 123 45 67'
                title={t("reset_password")}
                isOpen={isOpen}
                acceptBtnTitle={t("send")}
                onAccept={onAccept}
                onCancel={onClose}
            />

            <Navbar/>
        </Box>

    );
};

export default AccountPage;