import React from 'react';
import MPaper from './MPaper';
import { Avatar, Box, Stack, Typography, colors } from '@mui/material';
import { images } from '../../assets';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const UserBookingCard = () => {
  return (
    <MPaper title="اخر اعلان ">
      <Stack spacing={3}>
        {/* user info */}
        <Stack direction="row" spacing={2}>
          <Avatar alt="user" src={images.userProfile} />
          <Stack justifyContent="space-between">
            <Typography variant="subtitle2">
             احمد خالد الظهراوي 
            </Typography>
            <Typography variant="caption" color={colors.grey[500]}>
              02 Sep 2024 09:50
            </Typography>
          </Stack>
        </Stack>
        {/* user info */}

        {/* booking info */}
        <Stack direction="row" alignItems="center" spacing={5} sx={{ color: colors.grey[600] }}>
          
         
        </Stack>
        {/* booking info */}

        {/* image */}
        <Box sx={{
          pt: "100%",
          position: "relative",
          "& img": {
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
            borderRadius: 8
          }
        }}>
          <img src={images.bookingImage} alt="booking" />
        </Box>
        {/* image */}
      </Stack>
    </MPaper>
  );
};

export default UserBookingCard;