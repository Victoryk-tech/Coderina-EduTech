import { Box, Typography } from '@mui/material'
import React from 'react'
import ImpactSlider from '../../About/components/ImpactSlider'

const LegoImpact = () => {
    return (
        <Box className="aboutImpact__container lego__impact">
            <Typography variant='h4'>Inspiring Generations of Global Citizens and Helping Them Realize Their Power to Build a Better Future</Typography>
            <ImpactSlider lego />
        </Box>
    )
}

export default LegoImpact