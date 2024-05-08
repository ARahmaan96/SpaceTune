import React from "react";
import { Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";

const ContactUs = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!"); // Replace with actual form submission logic
  };

  return (
    <div
      style={{ justifyContent: "center", padding: "50px", marginLeft: "50px" }}
    >
      <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ textAlign: "center", paddingBottom: "50px" }}
      >
        Get in touch with us if you have any questions or feedback.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              type="email"
            />
            <TextField
              label="Message"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              required
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%", marginTop: 2, bgcolor: "salmon" }}
            >
              Send Message
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2">
            Our Information
          </Typography>
          <Typography variant="body1" component="p">
            Email: info@spacetune.com
          </Typography>
          <Typography variant="body1" component="p">
            Phone: (+20) 10-6600-3801
          </Typography>
          <IconButton href="mailto:info@spacetune.com">
            <EmailIcon />
          </IconButton>
          <IconButton href="tel:01066003801">
            <PhoneIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUs;
