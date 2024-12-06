import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const AboutHeader = () => {
    return (
        <Box component={"header"} className='about__header'>
            <Stack>
                <Stack>
                    <Paper variant='outlined' sx={{ fontSize: { xs: "12px", md: "14px" }, whiteSpace: "nowrap" }}>About us</Paper>
                    <Stack>
                        <Typography variant='h4' fontSize={{ xs: "20px", md: "32px" }}>Coderina is a leading non-profit organization focused on transforming education in Africa</Typography>
                        <Typography fontSize={{ xs: "15px", md: "19px" }}>Based in Nigeria, we specialize in providing technology-driven solutions that empower students and educators through STEAM (Science, Technology, Engineering, Arts, and Mathematics) education.</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default AboutHeader