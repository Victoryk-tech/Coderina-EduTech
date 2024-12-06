import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { RiArrowRightLine } from "react-icons/ri";
import { RiArrowLeftLine } from "react-icons/ri";
import UpSlider from './UpSlider';


const Upcoming = () => {
    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
    };


    const previous = () => {
        sliderRef.slickPrev();
    };

    return (
        <Box className="upcomingSec__Container sec__container">
            <Stack className='upcomingSec__header'>
                <Typography variant="h5" fontSize={{ xs: "22px", md: "32px" }}>Upcoming Events</Typography>
                <Stack>
                    <IconButton sx={{ padding: { xs: "default", md: "12px" } }} onClick={previous}><RiArrowLeftLine /></IconButton>
                    <IconButton sx={{ padding: { xs: "default", md: "12px" } }} onClick={next}><RiArrowRightLine /></IconButton>
                </Stack>
            </Stack>
            <UpSlider
                slider={slider => {
                    sliderRef = slider
                }}
            />
        </Box>
    )
}

export default Upcoming