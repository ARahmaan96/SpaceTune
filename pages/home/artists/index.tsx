import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import ArtistCard, { ArtistCardProps } from "@/components/musicCards/ArtistCard";

const ArtistsPage = () => {
  const [artists, setArtists] = useState<ArtistCardProps[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("/api/artists");

        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Artists
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {artists.map((artist: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={artist.id}
            sx={{ display: "flex" }}
          >
            <ArtistCard
              id={artist.id}
              artist_name={artist.artist_name}
              nationality={artist.nationality}
              language={artist.language}
              image_url={artist.image_url}
              age={artist.age}
              no_of_albums={artist.no_of_albums}
              no_of_songs={artist.no_of_songs}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArtistsPage;
