import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  TextField,
  Button,
  Container,
  Typography,
  Box
} from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required")
});

const ContactUs = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
    alert("Message Sent Successfully!");
    reset();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }} style={{padding:"20px"}}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3
        }}
      >
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Message"
          multiline
          rows={4}
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <Button variant="contained" type="submit">
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default ContactUs;