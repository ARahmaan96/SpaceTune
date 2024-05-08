import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";

function UpdateArtist() {
  const router = useRouter();
  const { artistId } = router.query;
  const [formData, setFormData] = useState({
    artist_name: "",
    nationality: "",
    language: "",
    image_url: "",
    age: "",
    no_of_albums: "",
    no_of_songs: "",
  });

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await axios.get(`/api/artists/${artistId}`);
        console.log("Response:", response.data);

        setFormData((prevState) => ({ ...prevState, ...response.data }));
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };
    if (artistId) {
      fetchArtistDetails();
    }
  }, [artistId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put("/api/artists/update/" + router.query.artistId, {
        ...formData,
      });

      alert("Artist updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error updating Artist:", error);
      alert("Failed to update Artist. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        marginBottom: "20px",
        top: "1px",
        left: "20px",
        right: "0vw",
        bottom: "55px",
        minWidth: "80vw",
        overflowY: "auto",
      }}
    >
      <Form
        className="p-5 m-auto"
        onSubmit={handleSubmit}
        style={{
          paddingBottom: "100px",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "1px",
          left: "15vw",
          right: "5vw",
          bottom: "100px",
          minWidth: "80vw",
          maxWidth: "80vw",
        }}
      >
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

        <Form.Group className="mb-3" controlId="formBasicNationality">
          <Form.Label>Nationality</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLanguage">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImageUrl">
          <Form.Label>Artist Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter artist image URL"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNoOfAlbums">
          <Form.Label>Number of Albums</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of albums"
            name="no_of_albums"
            value={formData.no_of_albums}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNoOfSongs">
          <Form.Label>Number of Songs</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of songs"
            name="no_of_songs"
            value={formData.no_of_songs}
            onChange={handleChange}
            required
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
    </div>
  );
}

export default UpdateArtist;
