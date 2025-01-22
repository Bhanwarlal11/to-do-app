const express = require('express');
const router = express.Router();
const {
  getTaskStats,
  getPieChartData,
  getTaskCreatedByDay,
} = require('../controllers/statsController');
const { protect } = require("../middlewares/authMiddleware");


router.get('/tasks', protect,getTaskStats);

router.get('/pie-chart',protect, getPieChartData);


module.exports = router;
