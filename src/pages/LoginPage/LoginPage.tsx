import {Box, Button} from "@chakra-ui/react";
import {SectionTitle} from "../../components/SectionTitle/SectionTitle.tsx";
import {useTranslation} from "react-i18next";
import LoginForm from "./components/LoginForm.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const { t } = useTranslation();
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Check if the token exists in localStorage
        if (window.localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <Box
            py="20px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100vh"
        >
            <Box>
                <SectionTitle title={t("entrance")} mb="20px"/>
                <LoginForm setLoading={setLoading}/>
            </Box>
            <Box>
                <Button
                    form="login-form"
                    w="100%"
                    type="submit"
                    variant="primary"
                    isLoading={loading}
                >
                    {t("login")}
                </Button>

                {/*<Text textAlign='center' mt="20px"  color="darkGrey" fontSize="16px" mb="38px">*/}
                {/*    {t("dont_have_account")}{" "}*/}
                {/*    <Text*/}
                {/*        onClick={() => {*/}
                {/*            navigate(mainPaths.Registration);*/}
                {/*        }}*/}
                {/*        as="button"*/}
                {/*        color="activePurple"*/}
                {/*        fontWeight={500}*/}
                {/*        textDecoration="underline"*/}
                {/*        // onClick={onLoginAccountClick}*/}
                {/*    >*/}
                {/*        {t("create_account")}*/}
                {/*    </Text>*/}
                {/*</Text>*/}
            </Box>
        </Box>
    );
};

export default LoginPage;