import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addActivity({
        ...activity,
        duration: Number(activity.duration),
        caloriesBurned: Number(activity.caloriesBurned),
      });

      if (onActivityAdded) {
        onActivityAdded();
      }

      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {},
      });
    } catch (error) {
      console.error("Error adding activity:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 4 }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Activity Type</InputLabel>

        <Select
          value={activity.type}
          label="Activity Type"
          onChange={(e) =>
            setActivity({
              ...activity,
              type: e.target.value,
            })
          }
        >
          <MenuItem value="RUNNING">
            Running
          </MenuItem>

          <MenuItem value="WALKING">
            Walking
          </MenuItem>

          <MenuItem value="CYCLING">
            Cycling
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        required
        label="Duration (Minutes)"
        type="number"
        sx={{ mb: 2 }}
        value={activity.duration}
        onChange={(e) =>
          setActivity({
            ...activity,
            duration: e.target.value,
          })
        }
      />

      <TextField
        fullWidth
        required
        label="Calories Burned"
        type="number"
        sx={{ mb: 2 }}
        value={activity.caloriesBurned}
        onChange={(e) =>
          setActivity({
            ...activity,
            caloriesBurned: e.target.value,
          })
        }
      />

      <Button
        type="submit"
        variant="contained"
      >
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivityForm;
