import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { Pie, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getPieChartData,
  getTasksCreatedByDay,
  getTaskStats,
} from "../api/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Stats = () => {
  const [taskStats, setTaskStats] = useState({});
  const [pieData, setPieData] = useState({});
  const [barData, setBarData] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const response = await getTaskStats(token);
        setTaskStats(response.data);
      } catch (error) {
        console.error("Error fetching task stats:", error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const response = await getPieChartData(token);
        setPieData(response.data);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchTaskStats();
    fetchPieChartData();
  }, [token]);

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
      {/* Total Task Stats */}
      <Box sx={{ padding: 1, marginBottom: 4, border: "none" }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Total Tasks Box */}
          <Grid
            item
            xs={12} // Full width on small screens
            sm={4} // 4 columns on small screens and up (out of 12)
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                sx={{
                  bgcolor: "#f0f0f0",
                  padding: "2rem",
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h4"
                  color="black"
                  sx={{ marginBottom: 2, fontWeight: "bold" }}
                >
                  Total Tasks
                </Typography>
                <Typography variant="h4">
                  {taskStats.totalTasks || 0}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Completed Box */}
          <Grid
            item
            xs={12} // Full width on small screens
            sm={4} // 4 columns on small screens and up (out of 12)
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                sx={{
                  bgcolor: "#f0f0f0",
                  padding: "2rem",
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h4"
                  color="black"
                  sx={{ marginBottom: 2, fontWeight: "bold" }}
                >
                  Completed
                </Typography>
                <Typography variant="h4" color="success">
                  {taskStats.totalCompleted || 0}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Pending Box */}
          <Grid
            item
            xs={12} // Full width on small screens
            sm={4} // 4 columns on small screens and up (out of 12)
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                sx={{
                  bgcolor: "#f0f0f0",
                  padding: "2rem",
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h4"
                  color="black"
                  sx={{ marginBottom: 2, fontWeight: "bold" }}
                >
                  Pending
                </Typography>
                <Typography variant="h4" color="error">
                  {taskStats.totalPending || 0}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // padding:"rem"
        }}
      >
        <Box sx={{ marginTop: 4, textAlign: "center", maxWidth: "100%", width:"500px" }}>
          <Typography variant="h5" gutterBottom>
            Task Distribution
          </Typography>
          <Pie
            data={{
              labels: pieData.labels || [],
              datasets: [
                {
                  label: "Task Distribution",
                  data: pieData.data || [],
                  backgroundColor: ["#ff6347", "#32cd32", "#1e90ff"], // New colors (Tomato, LimeGreen, DodgerBlue)
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              animation: {
                animateScale: true,
                animateRotate: true,
              },
              responsive: true,
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default Stats;
