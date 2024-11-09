import { Box, Button, Checkbox } from "@chakra-ui/react";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle.tsx";
import { useTranslation } from "react-i18next";
import { Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { mainPaths } from "../../routes/paths/mainPaths.ts";
import { useState } from "react";
import LoginForm from "../LoginPage/components/LoginForm.tsx";

const RegistrationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading , setLoading] = useState(false)

    const onLoginAccountClick = () => {
        navigate(mainPaths.Login);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptTerms(e.target.checked);
    };

    return (
        <Box
            py="20px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100vh"
        >
            <Box>
                <SectionTitle title={t("new_account")} mb="20px" />
                {/*<RegistrationForm/>*/}
                <LoginForm setLoading={setLoading} />
                <Checkbox
                    isChecked={acceptTerms} // Bind state
                    onChange={handleCheckboxChange} // Handle change
                    colorScheme="blue"
                >
                    <Text textAlign="center" color="darkGrey" fontSize="16px">
                        {t("accept_terms")}{" "}
                        <Text
                            as="button"
                            color="activePurple"
                            fontWeight={500}
                            textDecoration="underline"
                        >
                            {t("offert")}
                        </Text>
                    </Text>
                </Checkbox>
            </Box>
            <Box>
                <Button
                    form="login-form"
                    w="100%"
                    type="submit"
                    variant="primary"
                    isDisabled={!acceptTerms}
                    isLoading={loading}
                >
                    {t("create_account")}
                </Button>

                <Text
                    textAlign="center"
                    mt="20px"
                    color="darkGrey"
                    fontSize="16px"
                    mb="38px"
                >
                    {t("have_account")}{" "}
                    <Text
                        as="button"
                        color="activePurple"
                        fontWeight={500}
                        textDecoration="underline"
                        onClick={onLoginAccountClick}
                    >
                        {t("login")}
                    </Text>
                </Text>
            </Box>
        </Box>
    );
};

export default RegistrationPage;
