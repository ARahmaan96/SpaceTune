import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from "@mui/material";

interface TrackCardProps {
  name: string;
  artist_name: string;
  track_image: string;
  artist_image: string;
  duration: string;
}

const TrackCard: React.FC<TrackCardProps> = ({
  name,
  artist_name,
  track_image,
  artist_image,
  duration,
}) => {
  const handleClick = () => {};

  return (
    <Card
      sx={{
        width: 600,
        height: 100,
        backgroundImage: "url(" + track_image + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "screen",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        alignItems: "center",
        border: "2px solid #121481",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <CardActionArea onClick={handleClick}>
        {/* Avatar Image */}
        <Avatar
          alt={name}
          src={artist_image}
          sx={{
            width: 80,
            height: 80,
            margin: "10px",
            left: "0px",
            top: "0px",
          }}
        />
        <CardContent
          sx={{
            position: "absolute",
            top: 0,
            left: 100,
            paddingTop: ".7rem",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: "1.6rem",
              color: "navy",
              whiteSpace: "nowrap",
              maxWidth: "380px",
              //   textShadow: "2px 2px 1px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              fontSize: "1.2rem",
              whiteSpace: "nowrap",
              maxWidth: "380px",
              overflow: "hidden",
            }}
          >
            {artist_name}
          </Typography>
        </CardContent>
        {/* Duration on the right */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            right: "20px",
            top: "20px",
            fontWeight: "bold",
            color: "navy",
          }}
        >
          {duration}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default TrackCard;
