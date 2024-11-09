import {FC} from 'react';
import {Box, Image, Text} from "@chakra-ui/react";

import Uzcard from "../../../assets/images/Uzcard.png"
import HumoCard from "../../../assets/images/Humo.png"
import {HumoCardIcon} from "../../../assets/icons/HumoCardIcon.tsx";
import {UzcardIcon} from "../../../assets/icons/UzcardIcon.tsx";

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
    item: CardItem;
}

const CardSmall: FC<CardProps> = ({item}) => {



    return (
        <Box key={item.id} position='relative'  width='200px' height='120px'  borderRadius='16px' overflow='hidden'>
            <Image src={item?.processingType === "UZCARD" ? Uzcard : HumoCard} alt="Card Background" objectFit='cover'  w='100%' h='100%' />
            <Box position='absolute' top='12%' left='6%' right='6%' bottom='12%'>

                {item?.processingType === "UZCARD" ? <UzcardIcon/> : <HumoCardIcon/>}

                <Text position='absolute' fontSize='16px'  bottom='20px' color='white' >
                    {item.cardNumber}
                </Text>

                <Box position='absolute'  bottom='0' left='0'>
                    <Text  fontSize='11px' color='white'>
                        {item.name} ${item.surName}
                    </Text>
                </Box>
                <Box position='absolute'  bottom='0' right='0'>
                    <Text fontSize='11px' color='white'>
                        {item.expiryDate}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default CardSmall;