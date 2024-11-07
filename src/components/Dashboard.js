import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Button, Box, Avatar } from "@mui/material";
import CourseCard from "./CourseCard";
import AddCourseModal from "./AddCourseModal";
import axios from "../axiosConfig";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Access teacher's info from Redux state
  const teacher = useSelector((state) => state.auth.user);
  console.log("teacher", teacher);

  const fetchCoursesByTeacher = async () => {
    try {
      const response = await axios.get("/api/courses/teacherId");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCoursesByTeacher();
  }, []);

  // Handle course addition by refetching courses
  const handleCourseAdded = async () => {
    await fetchCoursesByTeacher(); // Refetch all courses
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  //Logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6">Welcome, {teacher?.name}</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{ mt: 3 }}
          >
            Add Course
          </Button>
          <Avatar
            sx={{ mt: 3 }}
            alt={teacher?.name}
            src={"http://localhost:8000/" + teacher?.profilePicture}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Your Courses
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={3} key={course._id}>
            <CourseCard
              title={course.courseName}
              description={course.description}
              onDelete={() => handleDeleteCourse(course._id)} // Pass delete handler with course ID
            />
          </Grid>
        ))}
      </Grid>

      <AddCourseModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCourseAdded={handleCourseAdded}
      />
    </div>
  );
}

export default Dashboard;
