import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import { Copyright } from "@mui/icons-material";

const teamMembers = [
  {
    name: "Ahmed Elghabour"
  },
  {
    name: "Mohamed Gamal"
  },
  {
    name: "Ahmed Elgamal"
  },
  {
    name: "Abdulrahman Khallaf"
  },
  { name: "Ahmed Amgad"},
];

const About = () => {
  return (
    <div>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", paddingTop: "50px", paddingBottom: "20px", color: "cyan" }}
      >
        About Us
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ textAlign: "center", paddingBottom: "50px", marginRight: "10%", marginLeft: "10%", color: "white" }}
      >
        We are a team passionate about music and the Qur'an, and we created this
        website to provide a platform for users to enjoy both.
      </Typography>

      {/* Team Section */}
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: "center", paddingBottom: "20px", color: "cyan" }}
      >
        Our Team
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        {teamMembers.map((member) => (
          <Grid
            item
            key={member.name}
            // xs={12}
            // md={4}
            sx={{ textAlign: "center" }}
          >
            <Card sx={{ display: "flex", alignItems: "center", backgroundColor: "lightblue", marginLeft: "25px", marginRight: "25px", width: "290px", justifyContent: "center" }}>
              <CardContent>
                <Typography  style={{color: "darkblue", fontWeight: "bold"}} variant="h6" component="div">
                  {member.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Website Info Section */}
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: "center", paddingTop: "50px", color: "cyan", paddingBottom: "20px" }}
      >
        Website Information
      </Typography>
      <Typography variant="body1" component="p" sx={{ textAlign: "center", marginRight: "15%", marginLeft: "15%", color: "white", marginBottom: "2%" }}>
        This website is a platform for music and Qur'an enthusiasts. You can find
        a wide variety of music genres and Qur'an recitations to suit your taste.
        We are constantly adding new content, so be sure to check back often!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: "#FFFFFF",
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Copyright
          sx={{ marginRight: "5px", fontSize: "small" }}
        />
        SpaceTune
      </Typography>
    </div>
  );
};

export default About;
