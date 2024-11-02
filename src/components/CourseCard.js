// src/components/CourseCard.js
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

function CourseCard({ title, description, onDelete }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: 6,
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={onDelete}
          sx={{ mt: 2 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
