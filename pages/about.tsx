import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";

const teamMembers = [
  {
    name: "Ahmed Elghabour",
    image: "https://example.com/images/ahmed-elghabour.jpg",
  },
  {
    name: "Mohamed Gamal",
    image: "https://example.com/images/mohamed-gamal.jpg",
  },
  {
    name: "Ahmed Elgamal",
    image: "https://example.com/images/ahmed-elgamal.jpg",
  },
  {
    name: "Abdulrahman Khallaf",
    image: "https://example.com/images/abdulrahman-khallafah.jpg",
  },
  { name: "Ahmed Amgad", image: "https://example.com/images/ahmed-amgad.jpg" },
];

const About = () => {
  return (
    <div>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", paddingTop: "50px" }}
      >
        About Us
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ textAlign: "center", paddingBottom: "50px" }}
      >
        We are a team passionate about music and the Quran, and we created this
        website to provide a platform for users to enjoy both.
      </Typography>

      {/* Team Section */}
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: "center", paddingBottom: "20px" }}
      >
        Our Team
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {teamMembers.map((member) => (
          <Grid
            item
            key={member.name}
            // xs={12}
            // md={4}
            sx={{ textAlign: "center" }}
          >
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                image={member.image}
                alt={member.name}
                sx={{ width: "150px" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
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
        sx={{ textAlign: "center", paddingTop: "50px" }}
      >
        Website Information
      </Typography>
      <Typography variant="body1" component="p" sx={{ textAlign: "center" }}>
        This website is a platform for music and Quran enthusiasts. You can find
        a wide variety of music genres and Quran recitations to suit your taste.
        We are constantly adding new content, so be sure to check back often!
      </Typography>
    </div>
  );
};

export default About;
