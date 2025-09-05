import express = require('express');
import cors = require('cors');
import {ethers} from 'ethers';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/verify-signature', (req, res) => {
  const {message, signature} = req.body;
  try {
    const signer = ethers.verifyMessage(message, signature);
    const isValid = !!signer;
    res.json({isValid, signer, originalMessage: message});
  } catch (error) {
    res.status(400).json({isValid: false, signer: null, originalMessage: message});
  }
});

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
