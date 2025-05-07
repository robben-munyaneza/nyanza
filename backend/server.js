require('dotenv').config(); // 👈 MUST be first
const router =require('./routes/auth.js')
const jobRoutes = require('./routes/jobposition');
const applicantRoutes = require('./routes/Applicants');
const applicationRoutes = require('./routes/application');
const recruitmentRoutes = require('./routes/recruitmentstages');
const express = require('express');
const connectDB = require('./config/db');
const cors= require('cors')

const app = express();
app.use(express.json());
app.use(cors())

connectDB();

app.use("/api/auth",router)
app.use('/api/jobposition', jobRoutes);
app.use('/api/Applicant', applicantRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/recruitmentstages', recruitmentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
