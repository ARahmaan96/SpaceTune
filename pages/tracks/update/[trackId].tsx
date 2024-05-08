import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";

function UpdateTrack() {
  const router = useRouter();
  const { trackId } = router.query;

  const [formData, setFormData] = useState({
    // id: "",
    name: "",
    track_image: "",
    artist_name: "",
    artist_image: "",
    category_id: "",
    duration: "",
  });

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await axios.get(`/api/tracks/${trackId}`);
        console.log("Response:", response.data);

        setFormData((prevState) => ({ ...prevState, ...response.data }));
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };
    if (trackId) {
      fetchTrackDetails();
    }
  }, [trackId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`/api/tracks/update/${trackId}`, {
        ...formData,
      });

      alert("Track updated successfully!");
    } catch (error) {
      console.error("Error updating Track:", error);
      alert("Failed to update Track. Please try again.");
    }
  };

  return (
    <Form
      className="p-5 m-auto"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "20px",
        left: "15vw",
        right: "5vw",
        bottom: "100px",
        minWidth: "80vw",
        maxWidth: "80vw",
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImageUrl">
        <Form.Label>Track Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          name="track_image"
          value={formData.track_image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicArtistName">
        <Form.Label>Artist Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter artist name"
          name="artist_name"
          value={formData.artist_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicArtistImageUrl">
        <Form.Label>Artist Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter artist image URL"
          name="artist_image"
          value={formData.artist_image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategoryId">
        <Form.Label>Category ID (Optional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category ID"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDuration">
        <Form.Label>Duration (Optional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter duration (e.g., 4:20)"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        variant="contained"
        type="submit"
        style={{ width: "100%", marginTop: 2, backgroundColor: "salmon" }}
      >
        UPDATE
      </Button>
    </Form>
  );
}

export default UpdateTrack;
