import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { AiOutlineCalendar } from "react-icons/ai";
import { TbClockHour3 } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import Input from 'antd/es/input/Input';

const EventBody = () => {
    const upCard = [
        {
            color: "#9AEFC7",
            date: "July 27, 2021",
            title: "STEAM Classes",
            time: "8:00 am - 5:00 pm",
            location: "National Library of Nigeria Plot 274, Central Business District,, Abuja Book Classes here https://coderina.org/SCHEDULE/",
        },
        {
            color: "#A6E5FC",
            date: "August 3, 2020",
            time: "8:00 am - 5:00 pm",
            title: "Job Readiness Programme",
            location: "Online Online",
        },
        {
            color: "#A6E5FC",
            date: "July 27, 2020 - Sep 30, 2021",
            time: "8:00 am - 5:00 pm",
            title: "CPPD for Teachers",
            location: "Online Online",
        },
        {
            color: "#A6E5FC",
            date: "August 3, 2020",
            time: "8:00 am - 5:00 pm",
            title: "Job Readiness Programme",
            location: "Online Online",
        },
    ]


    return (
        <Box className="event__container">
            <Stack>
                <Stack className='event__upcoming' justifyContent={["center", "space-between"]}>
                    <Typography variant='h4'>Upcoming Events</Typography>
                    <form action="submit">
                        <Input width={{ xs: "100%", md: "300px" }} type='text' style={{ borderRadius: "2em" }} prefix={<FiSearch />} placeholder='Search for event' />
                    </form>
                </Stack>
                <Grid container justifyContent={"space-between"} gap={2.2}>
                    {upCard.map((card, i) => (
                        <Grid key={i} size={{ xs: 12, md: 5.9 }}>
                            <Card className='event__card'>
                                <CardContent>
                                    <Stack className='event__grid'>
                                        <Stack bgcolor={card.color}></Stack>
                                        <Stack>
                                            <Stack color={card.color}>
                                                <Typography fontSize={{ xs: "12px", md: "14px" }}><AiOutlineCalendar />{card.date}</Typography>
                                                <Typography fontSize={{ xs: "12px", md: "14px" }}><TbClockHour3 />{card.time}</Typography>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="h6" fontSize={{ xs: "22px", md: "30px" }}>{card.title}</Typography>
                                                <Typography fontSize={{ xs: "12px", md: "14px" }}>{card.location}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <Stack>
                <Stack className='event__upcoming'>
                    <Typography variant='h4'>Past Events</Typography>
                    <Stack></Stack>
                </Stack>
                <Grid container justifyContent={"space-between"} gap={2.2}>
                    {upCard.map((card, i) => (
                        <Grid key={i} size={{ xs: 12, md: 5.9 }}>
                            <Card className='event__card'>
                                <CardContent>
                                    <Stack className='event__grid'>
                                        <Stack bgcolor={card.color}></Stack>
                                        <Stack>
                                            <Stack color={card.color}>
                                                <Typography fontSize={{ xs: "12px", md: "14px" }}><AiOutlineCalendar />{card.date}</Typography>
                                                <Typography fontSize={{ xs: "12px", md: "14px" }}><TbClockHour3 />{card.time}</Typography>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="h6" fontSize={{ xs: "22px", md: "30px" }}>{card.title}</Typography>
                                                <Typography fontSize={{ xs: "12px", md: "14px" }}>{card.location}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Box>
    )
}

export default EventBody