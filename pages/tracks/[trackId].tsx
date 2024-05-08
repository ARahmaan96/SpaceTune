import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { IconButton } from "@mui/material";
import Link from "next/link";

const TrackDetails = () => {
  const router = useRouter();
  const { trackId } = router.query;

  const [trackDetails, setTrackDetails] = useState<any>(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await axios.get(`/api/tracks/${trackId}`);
        console.log("Response:", response.data);

        setTrackDetails(response.data);
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };
    if (trackId) {
      fetchTrackDetails();
    }
  }, [trackId]);

  if (!trackDetails) {
    return <div>Loading Track details...</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        top: "20px",
        left: "20px",
        width: "80vw",
      }}
    >
      <div className="movie_card">
        <div className="info_section">
          <div className="movie_header">
            <img
              className="locandina"
              src={trackDetails.artist_image}
              alt=""
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <h2>{trackDetails.name}</h2>
            <span className="minutes">{trackDetails.duration}</span>
            <p className="type">Romantic</p>
          </div>
          <div className="movie_desc">
            <p
              className="text"
              style={{
                marginLeft: "15px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {trackDetails.artist_name}
            </p>
          </div>

          <div className="movie_social">
            <IconButton
              component={Link}
              href={`/tracks/update/${trackDetails.id}`}
              size="small"
              sx={{
                color: "white",
                margin: "10px",
                bgcolor: "#10439F",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              Update
            </IconButton>
          </div>
        </div>
        <div
          className="blur_back"
          style={{ backgroundImage: `url(${trackDetails.track_image})` }}
        />
      </div>
    </div>
  );
};

export default TrackDetails;
