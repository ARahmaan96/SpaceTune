import React from "react";
import { Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";

const ContactUs = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Form submitted!"); // Replace with actual form submission logic
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "60px", marginRight: "10%", marginLeft: "10%s" }}>
      <div style={{ border: "2px solid #1976D2", padding: "20px", maxWidth: "600px", color: "#FFFFFF", textAlign: "center" }}>
        <Typography style={{color: "cyan"}} variant="h3" component="h1">
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          component="p"
          style={{ paddingBottom: "20px" }}
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
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF", borderColor: "#FFFFFF" } }}
              />
              <TextField
                label="Email Address"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                type="email"
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF", borderColor: "#FFFFFF" } }}
              />
              <TextField
                label="Message"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                required
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF", borderColor: "#FFFFFF" } }}
              />
              <Button
                variant="contained"
                type="submit"
                style={{ width: "80%", margin: "20px auto 0", backgroundColor: "#1976D2", color: "#FFFFFF" }}
              >
                Send Message
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography style={{color: "cyan"}} variant="h6" gutterBottom>
              Our Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: info@spacetune.com
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: (+20) 12-3456-7890
            </Typography>
            <IconButton style={{color: "orange"}} href="mailto:info@spacetune.com">
              <EmailIcon />
            </IconButton>
            <IconButton style={{color: "orange"}} href="tel:01234567890">
              <PhoneIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ContactUs;
