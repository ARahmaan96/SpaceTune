import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export interface ArtistCardProps {
  id: number;
  artist_name: string;
  nationality: string;
  language: string;
  image_url: string;
  age: number;
  no_of_albums: number;
  no_of_songs: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  artist_name,
  nationality,
  language,
  image_url,
  age,
  no_of_albums,
  no_of_songs,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/home/artists/${id}`);
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "10px auto",
    overflow: "hidden",
  };

  const nameStyle = {
    textAlign: "center" as "center",
    fontSize: "1.5rem",
    overflow: "hidden",
  };

  return (
    <Card
      sx={{
        width: "200px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "none",
        backgroundColor: "rgba(120, 100, 200, 0.4)",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <div style={imageStyle}>
          <CardMedia
            component="img"
            height="100%"
            image={image_url}
            alt={artist_name}
          />
        </div>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "#FF6500",
              fontFamily: "sans-serif",
              fontSize: "1.3rem",
            }}
            className="concert-one-regular"
            style={nameStyle}
          >
            {artist_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;
