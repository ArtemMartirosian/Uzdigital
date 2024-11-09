import {Box, Button} from "@chakra-ui/react";
import Navbar from "../HomePage/components/Navbar.tsx";
import {SectionTitle} from "../../components/SectionTitle/SectionTitle.tsx";
import {useTranslation} from "react-i18next";
import {Text} from "@chakra-ui/layout";
import LanguageDrawer from "../SettingsPage/components/LanguageDrawer.tsx";
import Option from "../SettingsPage/components/Options.tsx";
import {Question} from "../../assets/icons/Question.tsx";
import {mainPaths} from "../../routes/paths/mainPaths.ts";
import {useNavigate} from "react-router-dom";
import {OffertIcon} from "../../assets/icons/OffertIcon.tsx";
import {useEffect} from "react";

const UnregisteredPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onAboutServiceOptionClick = () => {
        navigate(mainPaths.About);
    };

    const onLoginClick = () => {
        navigate(mainPaths.Login);
    };

    const onCreateAccountClick = () => {
        navigate(mainPaths.Registration);
    };


    useEffect(() => {
        const storedToken = window.localStorage.getItem("token");
        if(storedToken){
            navigate(mainPaths.Account);
        }
    }, []);



    return (
        <Box py="20px">
            <SectionTitle title={t("account")} mb="20px" />
            <Text fontSize="16px" mb="24px">
                {t("login_description")}
            </Text>
            <Button
                width="100%"
                type="submit"
                flexBasis="100%"
                mb="20px"
                onClick={onLoginClick}
                flexShrink={0}
            >
                {t("login")}
            </Button>
            <Text  color="darkGrey" fontSize="16px" mb="38px">
                {t("dont_have_account")}{" "}
                <Text
                    as="button"
                    color="activePurple"
                    fontWeight={500}
                    textDecoration="underline"
                    onClick={onCreateAccountClick}
                >
                    {t("create_account")}
                </Text>
            </Text>

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
            <Navbar />
        </Box>

    );
};

export default UnregisteredPage;