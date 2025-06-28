const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  const { trainSet, line, engineers } = req.body;

  if (!trainSet || !line || !Array.isArray(engineers)) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const message = {
    topic: 'all_users',
    notification: {
      title: `TS#${trainSet} Mainline Inspection done`,
      body: `by ${engineers.join(', ')} on ${line} Line`,
    }
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).json({ success: true, messageId: response });
  } catch (error) {
    console.error('FCM Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/send-underframe-notification', async (req, res) => {
  const { trainSet, location, engineers } = req.body;

  if (!trainSet || !location || !Array.isArray(engineers)) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const message = {
    topic: 'all_users',
    notification: {
      title: `TS#${trainSet} Underframe Inspection done`,
      body: `by ${engineers.join(', ')} at ${location}`,
    }
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).json({ success: true, messageId: response });
  } catch (error) {
    console.error('FCM Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
