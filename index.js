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
      title: `TS#${trainSet} inspection done`,
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

  if (!trainSet || !line || !Array.isArray(engineers)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const message = {
    topic: 'all_users',
    notification: {
      title: `TS#${trainSet} underframe inspection done`,
      body: `by ${engineers.join(', ')} at ${location}`
    }
  };

  try {
    const msgId = await admin.messaging().send(message);
    return res.status(200).json({ success: true, messageId: msgId });
  } catch (e) {
    console.error('FCM Error:', e);
    return res.status(500).json({ success: false, error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
