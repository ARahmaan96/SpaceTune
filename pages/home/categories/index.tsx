import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import CategoryCard from "@/components/musicCards/categoryCard";
import { useRouter } from "next/router";
import TrackCard from "@/components/musicCards/TrackCard";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/home/categories");

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTracks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tracks");

        setTracks(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchTracks();
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tracks
      </Typography>
      <Grid container spacing={3}>
        {tracks.map((track: any) => (
          <Grid item xs={12} key={track.id}>
            <TrackCard
              id={track.id}
              name={track.name}
              artist_name={track.artist_name}
              artist_image={track.artist_image}
              track_image={track.track_image}
              duration={track.duration}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" align="center" gutterBottom>
        Categories
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {categories.map((category: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={category.id}
            sx={{ display: "flex" }}
          >
            <CategoryCard
              name={category.name}
              image={category.image}
              id={category.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
