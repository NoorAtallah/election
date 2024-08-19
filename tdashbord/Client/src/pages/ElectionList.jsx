import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Data for election lists
const localLists = [
  { name: 'قائمة محلية 1', members: ['عضو 1', 'عضو 2', 'عضو 3'] },
  { name: 'قائمة محلية 2', members: ['عضو 4', 'عضو 5', 'عضو 6'] },
  { name: 'قائمة محلية 3', members: ['عضو 7', 'عضو 8', 'عضو 9'] },
  { name: 'قائمة محلية 4', members: ['عضو 10', 'عضو 11', 'عضو 12'] },
];

const partyLists = [
  { name: 'قائمة حزبية 1', members: ['عضو 1', 'عضو 2', 'عضو 3', 'عضو 4', 'عضو 5', 'عضو 6', 'عضو 7'] },
  { name: 'قائمة حزبية 2', members: ['عضو 8', 'عضو 9', 'عضو 10', 'عضو 11', 'عضو 12', 'عضو 13', 'عضو 14'] },
];

const ElectionList = () => {
  const [selectedList, setSelectedList] = useState(null);

  return (
    <Grid container spacing={3}>
      {/* Local Lists Section */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          القوائم المحلية
        </Typography>
        {localLists.map((list, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginBottom: 10 }}
          >
            <Card
              onClick={() => setSelectedList(list)}
              style={{
                borderRadius: 8,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.2)')}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)')}
            >
              <CardContent>
                <Typography variant="h6">{list.name}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Grid>

      {/* Party Lists Section */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          القوائم الحزبية
        </Typography>
        {partyLists.map((list, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginBottom: 10 }}
          >
            <Card
              onClick={() => setSelectedList(list)}
              style={{
                borderRadius: 8,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.2)')}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)')}
            >
              <CardContent>
                <Typography variant="h6">{list.name}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Grid>

      {/* Selected List Details */}
      {selectedList && (
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={{ marginTop: 20, borderRadius: 8, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h5">{selectedList.name}</Typography>
                <Typography variant="h6">الأعضاء:</Typography>
                <Typography variant="body2">{selectedList.members.join(', ')}</Typography>
                
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      )}
    </Grid>
  );
};

export default ElectionList;
