require('dotenv').config(); // 👈 MUST be first
const router =require('./routes/auth.js')
const jobRoutes = require('./routes/jobposition');
const express = require('express');
const connectDB = require('./config/db');
const cors= require('cors')

const app = express();
app.use(express.json());
app.use(cors())

connectDB();

app.use("/api/auth",router)
app.use('/api/jobposition', jobRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
