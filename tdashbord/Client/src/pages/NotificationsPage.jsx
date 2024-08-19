import React from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';

// مكون لتوضيح تفاصيل الإشعار
const NotificationCard = ({ title, message, date }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6" component="h3">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {message}
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
        {date}
      </Typography>
    </CardContent>
  </Card>
);

const NotificationsPage = () => {
  // بيانات للإشعارات الخاصة بالانتخابات
  const notifications = [
    {
      title: 'تحديث جديد في جدول الانتخابات',
      message: 'تم تحديث موعد الانتخابات الخاصة بالدائرة رقم 3 ليصبح في 20 أغسطس 2024.',
      date: '15 أغسطس 2024'
    },
    {
      title: 'إضافة مرشح جديد',
      message: 'تم إضافة مرشح جديد إلى قائمة الانتخابات في الدائرة رقم 1. يرجى التحقق من التفاصيل.',
      date: '12 أغسطس 2024'
    },
    {
      title: 'تحديث حالة التصويت',
      message: 'تم تحديث حالة التصويت للمترشح محمد علي. يرجى مراجعة الإحصائيات الجديدة.',
      date: '10 أغسطس 2024'
    },
    {
      title: 'تنبيه أمني',
      message: 'تم اكتشاف محاولة دخول غير مصرح بها على حسابك. يرجى تغيير كلمة المرور والتحقق من النشاط.',
      date: '9 أغسطس 2024'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
      </Typography>
      <Grid container spacing={2}>
        {notifications.map((notification, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <NotificationCard
              title={notification.title}
              message={notification.message}
              date={notification.date}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NotificationsPage;
