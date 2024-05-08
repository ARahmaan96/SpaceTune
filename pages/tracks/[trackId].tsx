import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

const TrackDetails = () => {
  const router = useRouter();
  const { trackId } = router.query;

  const [trackDetails, setTrackDetails] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tracks/${trackId}`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

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
                bgcolor: "#86469C",
                padding: "5px 15px",
                fontSize: "17px",
                borderRadius: "10px",
              }}
            >
              <EditIcon
                fontSize="small"
                sx={{ color: "yellow", marginRight: "5px" }}
              />
              Edit
            </IconButton>
            <IconButton
              onClick={handleDeleteConfirmation}
              size="small"
              sx={{
                color: "white",
                margin: "10px",
                bgcolor: "#86469C",
                padding: "5px 15px",
                fontSize: "17px",
                borderRadius: "10px",
              }}
            >
              <DeleteIcon
                fontSize="small"
                sx={{ color: "red", marginRight: "5px" }}
              />
              Delete
            </IconButton>
          </div>
        </div>
        <div
          className="blur_back"
          style={{ backgroundImage: `url(${trackDetails.track_image})` }}
        />
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this track?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TrackDetails;
