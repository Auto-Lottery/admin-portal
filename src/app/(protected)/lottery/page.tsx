"use client";

import React from 'react'
import LotteryList from '@/components/lottery/lottery-list';
import { Box, Text } from '@mantine/core'

const Lottery = () => {

    return (
        <Box mt="md" px="md" pb="md">
            <Text mb="md">Борлуулагдсан сугалааны жагсаалт</Text>
            <LotteryList />
        </Box>
    );
}

export default Lottery;