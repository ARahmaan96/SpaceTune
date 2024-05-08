// import React from "react";
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
//   Avatar,
// } from "@mui/material";

// export interface TrackCardProps {
//   id: number;
//   name: string;
//   artist_name: string;
//   track_image: string;
//   artist_image: string;
//   duration: string;
// }

// const TrackCard: React.FC<TrackCardProps> = ({
//   name,
//   artist_name,
//   track_image,
//   artist_image,
//   duration,
// }) => {
//   const handleClick = () => {};

//   return (
//     <Card
//       sx={{
//         //width: 500,
//         filter: "blur(2px)",
//         height: 100,
//         backgroundImage: "url(" + track_image + ")",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundBlendMode: "screen",
//         backgroundColor: "rgba(150, 150, 255, 0.45)",
//         alignItems: "center",
//         border: "2px solid #121481",
//         borderRadius: "20px",
//         overflow: "hidden",
//       }}
//     >
//       <CardActionArea onClick={handleClick}>
//         {/* Avatar Image */}
//         <Avatar
//           alt={name}
//           src={artist_image}
//           sx={{
//             width: 80,
//             height: 80,
//             margin: "10px",
//             left: "0px",
//             top: "0px",
//           }}
//         />
//         <CardContent
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 100,
//             paddingTop: ".7rem",
//           }}
//         >
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{
//               fontWeight: "bold",
//               fontFamily: "sans-serif",
//               fontSize: "1.6rem",
//               color: "navy",
//               whiteSpace: "nowrap",
//               maxWidth: "380px",
//               //   textShadow: "2px 2px 1px rgba(0, 0, 0, 0.2)",
//               overflow: "hidden",
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               color: "text.secondary",
//               fontSize: "1.2rem",
//               whiteSpace: "nowrap",
//               maxWidth: "380px",
//               overflow: "hidden",
//             }}
//           >
//             {artist_name}
//           </Typography>
//         </CardContent>
//         {/* Duration on the right */}
//         <Typography
//           variant="h6"
//           sx={{
//             position: "absolute",
//             right: "20px",
//             top: "20px",
//             fontWeight: "bold",
//             color: "navy",
//           }}
//         >
//           {duration}
//         </Typography>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default TrackCard;
// import React from "react";
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
//   Avatar,
//   Backdrop,
//   Box,
// } from "@mui/material";

// export interface TrackCardProps {
//   id: number;
//   name: string;
//   artist_name: string;
//   track_image: string;
//   artist_image: string;
//   duration: string;
// }

// const TrackCard: React.FC<TrackCardProps> = ({
//   name,
//   artist_name,
//   track_image,
//   artist_image,
//   duration,
// }) => {
//   const handleClick = () => {};

//   return (
//     <Card
//       sx={{
//         width: 500,
//         height: 100,
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: "20px",
//         backgroundColor: "rgba(100, 100, 150, 0.8)", // Semi-transparent black background
//       }}
//     >
//       {/* Background Image with Blur */}
//       <CardMedia
//         component="img"
//         image={track_image}
//         alt={name}
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           mixBlendMode: "screen",
//           filter: "blur(3px)", // Blur applied to background image only
//         }}
//       />

//       <CardActionArea onClick={handleClick}>
//         {/* Avatar Image */}
//         <Avatar
//           alt={name}
//           src={artist_image}
//           sx={{
//             width: 80,
//             height: 80,
//             margin: "10px",
//             left: "0px",
//             top: "0px",
//             position: "absolute", // Make avatar render on top of background
//           }}
//         />
//         <CardContent
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 100,
//             paddingTop: ".7rem",
//           }}
//         >
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{
//               fontWeight: "bold",
//               fontFamily: "sans-serif",
//               fontSize: "1.6rem",
//               color: "navy",
//               whiteSpace: "nowrap",
//               maxWidth: "380px",
//               overflow: "hidden",
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               color: "text.secondary",
//               fontSize: "1.2rem",
//               whiteSpace: "nowrap",
//               maxWidth: "380px",
//               overflow: "hidden",
//             }}
//           >
//             {artist_name}
//           </Typography>
//         </CardContent>
//         {/* Duration on the right */}
//         <Typography
//           variant="h6"
//           sx={{
//             position: "absolute",
//             right: "20px",
//             top: "20px",
//             fontWeight: "bold",
//             color: "navy",
//           }}
//         >
//           {duration}
//         </Typography>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default TrackCard;

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Backdrop,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

export interface TrackCardProps {
  id: number;
  name: string;
  artist_name: string;
  track_image: string;
  artist_image: string;
  duration: string;
  handleClick: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({
  id,
  name,
  artist_name,
  track_image,
  artist_image,
  duration,
  handleClick, // Received handleClick prop
}) => {
  const router = useRouter();

  handleClick = () => {
    router.push(`/tracks/${id}`);
  };

  return (
    <Card
      sx={{
        width: 500,
        height: 100,
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        backgroundColor: "rgba(100, 100, 150, 0.5)", // Semi-transparent black background
      }}
    >
      {/* Background Image with Blur */}
      <CardMedia
        component="img"
        image={track_image}
        alt={name}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "screen",
          filter: "blur(2px)", // Blur applied to background image only
        }}
      />

      {/* Clickable Card Area */}
      <CardActionArea
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
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
            position: "absolute", // Make avatar render on top of background
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
              fontWeight: "bold",
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
