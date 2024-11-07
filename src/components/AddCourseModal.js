import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "../axiosConfig";

function AddCourseModal({ open, onClose, onCourseAdded }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/courses/addCourse", data);
      console.log("Course Added:", response.data);
      onCourseAdded(response.data); // Callback to refresh courses list on the dashboard
      reset();
      onClose();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 5,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Course
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Course Title"
            fullWidth
            margin="normal"
            {...register("courseName", {
              required: "Course title is required",
            })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            {...register("description", {
              required: "Description is required",
            })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Course
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default AddCourseModal;
