import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  List,
} from "@mui/material";
import TrackCard, { TrackCardProps } from "@/components/musicCards/TrackCard";
import { ArtistCardProps } from "@/components/musicCards/ArtistCard";

const ArtistPage = () => {
  const router = useRouter();
  const { artistId } = router.query;
  const [artistData, setArtistData] = useState<ArtistCardProps | null>(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(`/api/artists/${artistId}`);
        setArtistData(response.data);

        // Fetch songs by artist name
        if (response.data?.artist_name) {
          const songsResponse = await axios.get(
            `http://localhost:3000/tracks?artist_name=${encodeURIComponent(
              response.data.artist_name
            )}`
          );
          setSongs(songsResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (artistId) {
      fetchArtistData();
    }
  }, [artistId]);

  const cardStyle = {
    width: "600px",
    height: "900px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    boxShadow: "none",
    backgroundColor: "rgba(120, 100, 200, 0.4)",
  };

  const imageStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    margin: "20px auto", // Center horizontally
    overflow: "hidden",
  };

  const nameStyle = {
    textAlign: "center" as "center",
    fontSize: "2rem",
    fontWeight: "bold",
    overflow: "hidden",
    margin: "10px",
  };

  const textStyle = {
    fontSize: "1.2rem",
    margin: "10px",
  };

  return (
    <div style={{ margin: "auto" }}>
      {artistData ? (
        <Card sx={cardStyle}>
          <CardActionArea>
            <div style={imageStyle}>
              <CardMedia
                component="img"
                height="100%"
                image={artistData.image_url}
                alt={artistData.artist_name}
              />
            </div>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: "#FF6500",
                  fontFamily: "sans-serif",
                  fontSize: "1.8rem",
                }}
                style={nameStyle}
              >
                {artistData.artist_name}
              </Typography>
              <Typography variant="body1" style={textStyle}>
                Nationality: {artistData.nationality}
              </Typography>
              <Typography variant="body1" style={textStyle}>
                Language: {artistData.language}
              </Typography>
              <Typography variant="body1" style={textStyle}>
                Age: {artistData.age}
              </Typography>
              <Typography variant="body1" style={textStyle}>
                Number of Albums: {artistData.no_of_albums}
              </Typography>
              <Typography variant="body1" style={textStyle}>
                Number of Songs: {artistData.no_of_songs}
              </Typography>
              <Typography variant="h6" style={textStyle}>
                Songs:
              </Typography>
              <List>
                {songs.map((song: TrackCardProps) => (
                  <TrackCard
                    id={song.id}
                    key={song.id}
                    name={song.name}
                    artist_name={song.artist_name}
                    track_image={song.track_image}
                    artist_image={song.artist_image}
                    duration={song.duration}
                    handleClick={() => {
                      // Handle click on track card
                    }}
                  />
                ))}
              </List>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ArtistPage;
