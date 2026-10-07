import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { getActivityDetail } from "../services/api";

const ActivityDetails = () => {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getActivityDetail(id);

        console.log("Activity detail:", response.data);

        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity:", error);

        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        }

        setError("Failed to load activity details.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  if (!activity) {
    return (
      <Typography>
        Activity not found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 2,
      }}
    >
      
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Activity Details
          </Typography>

          <Typography>
            Type: {activity.type}
          </Typography>

          <Typography>
            Duration: {activity.duration} minutes
          </Typography>

          <Typography>
            Calories Burned: {activity.caloriesBurned}
          </Typography>

          {activity.createdAt && (
            <Typography>
              Date:{" "}
              {new Date(activity.createdAt).toLocaleString()}
            </Typography>
          )}
        </CardContent>
      </Card>

      {activity.recommendation && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              AI Recommendation
            </Typography>

            <Typography variant="h6">
              Analysis
            </Typography>

            <Typography paragraph>
              {activity.recommendation}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {activity.improvements &&
              activity.improvements.length > 0 && (
                <>
                  <Typography variant="h6">
                    Improvements
                  </Typography>

                  {activity.improvements.map(
                    (improvement, index) => (
                      <Typography
                        key={index}
                        paragraph
                      >
                        • {improvement}
                      </Typography>
                    )
                  )}

                  <Divider sx={{ my: 2 }} />
                </>
              )}

            {activity.suggestions &&
              activity.suggestions.length > 0 && (
                <>
                  <Typography variant="h6">
                    Suggestions
                  </Typography>

                  {activity.suggestions.map(
                    (suggestion, index) => (
                      <Typography
                        key={index}
                        paragraph
                      >
                        • {suggestion}
                      </Typography>
                    )
                  )}

                  <Divider sx={{ my: 2 }} />
                </>
              )}

            {activity.safety &&
              activity.safety.length > 0 && (
                <>
                  <Typography variant="h6">
                    Safety Guidelines
                  </Typography>

                  {activity.safety.map(
                    (safety, index) => (
                      <Typography
                        key={index}
                        paragraph
                      >
                        • {safety}
                      </Typography>
                    )
                  )}
                </>
              )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetails;
