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
  List,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import TrackCard from "@/components/musicCards/TrackCard";

const ArtistPage = () => {
  const router = useRouter();
  const { artistId } = router.query;

  const [artistData, setArtistData] = useState<any>(null);
  const [tracks, setTracks] = useState<any>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(`/api/artists/${artistId}`);
        setArtistData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTracks = async () => {
      try {
        const response = await axios.get<any>("/api/tracks");
        setTracks(
          response.data.filter(
            (track: any) => track?.artist_name === artistData.artist_name
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtistData();
    fetchTracks();
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/artists/${artistId}`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  if (!artistData) {
    return <div className="Loading">Loading Artist details...</div>;
  }
  if (!tracks) {
    return <div className="Loading">Loading Tracks tracks...</div>;
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
              src={artistData.image_url}
              alt=""
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <h2>{artistData.artist_name}</h2>
            <p className="type fw-bold">Artist Age: {artistData.age}</p>
          </div>
          <br />
          <div className="movie_desc">
            <p className="text fw-bold" style={{ color: "salmon" }}>
              Nationality: {artistData.nationality}
            </p>
            <p className="text fw-bold" style={{ color: "salmon" }}>
              Language: {artistData.language}
            </p>
            <p className="text fw-bold" style={{ color: "salmon" }}>
              No. of Albums: {artistData.no_of_albums} Albums
            </p>
            <p className="text fw-bold" style={{ color: "salmon" }}>
              No. of Songs: {artistData.no_of_songs} Songs
            </p>
          </div>

          <div className="movie_social">
            <IconButton
              component={Link}
              href={`/home/artists/update/${artistData.id}`}
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
          style={{ backgroundImage: `url(${artistData.image_url})` }}
        />
      </div>

      <div
        style={{
          display: "flex",
          // gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List>
          {tracks.map((song: any) => (
            <div key={song.id} style={{ marginBottom: "15px" }}>
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
            </div>
          ))}
        </List>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this artist?
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

export default ArtistPage;
