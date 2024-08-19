import React, { useState, useEffect } from 'react';
import MPaper from './MPaper';
import { Box, CircularProgress, Stack, Typography, circularProgressClasses, colors } from '@mui/material';

const CountdownData = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        clearInterval(timer);
      } else {
        setTimeLeft(prevTime => {
          const newTime = { ...prevTime };
          if (newTime.seconds > 0) {
            newTime.seconds--;
          } else if (newTime.minutes > 0) {
            newTime.minutes--;
            newTime.seconds = 59;
          } else if (newTime.hours > 0) {
            newTime.hours--;
            newTime.minutes = 59;
            newTime.seconds = 59;
          } else if (newTime.days > 0) {
            newTime.days--;
            newTime.hours = 23;
            newTime.minutes = 59;
            newTime.seconds = 59;
          }
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progress = ((8 - timeLeft.days) / 8) * 100;

  return (
    <MPaper title="العد التنازلي لانتهاء الانتخابات">
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="center" p={3}>
          <Box position="relative">
            <CircularProgress
              variant="determinate"
              size={200}
              value={100}
              sx={{ color: colors.grey[200] }}
            />
            <CircularProgress
              variant="determinate"
              disableShrink
              size={200}
              value={progress}
              sx={{
                position: "absolute",
                left: 0,
                color: colors.green[600],
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: "round"
                }
              }}
            />
            <Box sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center"
            }}>
              <Typography variant="h4" color={colors.grey[800]}>{timeLeft.days}</Typography>
              <Typography variant="subtitle2" color={colors.grey[600]}>أيام</Typography>
            </Box>
          </Box>
        </Stack>
        <Stack spacing={1} direction="row" justifyContent="center">
          <CountdownUnit value={timeLeft.hours} label="ساعات" />
          <CountdownUnit value={timeLeft.minutes} label="دقائق" />
          <CountdownUnit value={timeLeft.seconds} label="ثواني" />
        </Stack>
      </Stack>
    </MPaper>
  );
};

const CountdownUnit = ({ value, label }) => (
  <Box textAlign="center" mx={1}>
    <Typography variant="h6" color={colors.grey[800]}>{value.toString().padStart(2, '0')}</Typography>
    <Typography variant="caption" color={colors.grey[600]}>{label}</Typography>
  </Box>
);

export default CountdownData;