import {Box, Center, ChakraProps, HStack, Text} from "@chakra-ui/react";
import {LogoutIcon} from "../../../assets/icons/LogoutIcon.tsx";
import {useNavigate} from "react-router-dom";
import {mainPaths} from "../../../routes/paths/mainPaths.ts";
import DeleteModal from "../../MyCardsPage/components/DeleteCardModal.tsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";
interface props extends ChakraProps {
    icon: JSX.Element;
    title: string;
    subTitle: string;
    bordered?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const ProfileOptions: React.FC<props> = ({
                                     icon,
                                     title,
                                             subTitle,
                                     bordered,
                                     disabled,
                                     onClick,
                                     ...props
                                 }) => {
    const navigate = useNavigate();
    const {t} = useTranslation()
    const [openModal , setOpenModal] = useState(false);



    const onAccept = () => {
        localStorage.removeItem("token")
        navigate(mainPaths.Home)
    }


    return (
        <HStack
            onClick={onClick}
            cursor={disabled ? "not-allowed" : "pointer"}
            borderBottom={bordered ? "1px solid #E8EEF7" : "none"}
            gap={2.5}
            height='58px'
            py={"14px"}
            alignItems={"center"}
            opacity={disabled ? 0.5 : 1}
            {...props}
        >
            <Center width="58px" height='58px' borderRadius="24px" bg={"lightRed"} p={"9px"} flexShrink={0}>
                {icon}
            </Center>
            <Box flexGrow={1}>
                <Text fontWeight={500} color='darkGrey' fontSize={"14px"}>
                    {subTitle}
                </Text>
                <Text fontWeight={600} color='black' fontSize={"16px"}>
                    {title}
                </Text>
            </Box>
            <LogoutIcon onClick={() => setOpenModal(true) } />

            <DeleteModal
                title={t("logout_description")}
                isOpen={openModal}
                acceptBtnTitle={t("logout")}
                onAccept={onAccept}
                onCancel={() => setOpenModal(false) }
            />

        </HStack>
    );
};

export default ProfileOptions;
