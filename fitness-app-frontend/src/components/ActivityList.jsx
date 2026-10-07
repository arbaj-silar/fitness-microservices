import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Your Activities
      </Typography>

      <Grid container spacing={3}>
        {activities.length === 0 ? (
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "#ffffff",
                textAlign: "center",
                py: 4,
              }}
            >
              No activities found.
            </Typography>
          </Grid>
        ) : (
          activities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card
                onClick={() =>
                  navigate(`/activities/${activity.id}`)
                }
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#e85d6a",
                  color: "#ffffff",
                  borderRadius: "12px",
                  transition: "0.3s",

                  "&:hover": {
                    backgroundColor: "#f06b78",
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      mb: 2,
                    }}
                  >
                    {activity.type}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#ffffff",
                      mb: 1,
                    }}
                  >
                    Duration: {activity.duration} minutes
                  </Typography>

                  <Typography
                    sx={{
                      color: "#ffffff",
                    }}
                  >
                    Calories: {activity.caloriesBurned}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ActivityList;
