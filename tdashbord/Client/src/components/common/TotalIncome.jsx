import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Paper, Stack, Typography, colors } from '@mui/material';
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const chartData = {
  labels: ["May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Visits",
      data: [1200, 1500, 1400, 1700, 1600, 1800, 1700, 1900],
      borderColor: colors.green[600],
      tension: 0.5
    }
  ]
};

const TotalVisits = () => {
  return (
    <Paper elevation={0} sx={{
      p: 4,
      background: "linear-gradient(135deg, rgba(0, 100, 0, 0.2), rgba(0, 50, 0, 0.2)) rgb(255, 255, 255)",
      color: colors.green[800],
      height: "100%"
    }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={2}>
            <Typography variant="body2" fontWeight="bold">عدد الزائرين</Typography>
            <Typography variant="h4" fontWeight="bold">57</Typography>
          </Stack>
          <Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <TrendingUpOutlinedIcon fontSize="small" />
              <Typography variant="body2" fontWeight="bold">
                +1.2%
              </Typography>
            </Stack>
            <Typography variant="subtitle2" fontWeight={400}>
              منذ يوم
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Line
            data={chartData}
            height={100}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                x: { display: false },
                y: { display: false }
              },
              elements: { point: { radius: 0 } },
              plugins: { legend: { display: false } }
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default TotalVisits;
