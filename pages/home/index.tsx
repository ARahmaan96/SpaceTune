import React, { useRef, useState, useEffect } from "react";
import { Container, Typography, Avatar, Paper, Grid } from "@mui/material";
import CategoryCard, {
  CategoryCardProps,
} from "@/components/musicCards/CategoryCard";
import Image from "next/image";
import TrackCard, { TrackCardProps } from "@/components/musicCards/TrackCard";
import ArtistCard, {
  ArtistCardProps,
} from "@/components/musicCards/ArtistCard";
import axios from "axios";

const HomePage: React.FC = () => {
  //const artists = Array.from({ length: 20 }, (_, i) => i + 1);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const artistsRef = useRef<HTMLDivElement>(null);
  const [isDraggingCategories, setIsDraggingCategories] = useState(false);
  const [isDraggingArtists, setIsDraggingArtists] = useState(false);
  const [dragStartXCategories, setDragStartXCategories] = useState(0);
  const [dragStartXArtists, setDragStartXArtists] = useState(0);
  const [scrollLeftCategories, setScrollLeftCategories] = useState(0);
  const [scrollLeftArtists, setScrollLeftArtists] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDraggingCategories) {
        const delta = event.clientX - dragStartXCategories;
        if (categoriesRef.current) {
          categoriesRef.current.scrollLeft = scrollLeftCategories - delta;
        }
      }
      if (isDraggingArtists) {
        const delta = event.clientX - dragStartXArtists;
        if (artistsRef.current) {
          artistsRef.current.scrollLeft = scrollLeftArtists - delta;
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingCategories(false);
      setIsDraggingArtists(false);
    };

    if (isDraggingCategories || isDraggingArtists) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDraggingCategories,
    isDraggingArtists,
    dragStartXCategories,
    dragStartXArtists,
    scrollLeftCategories,
    scrollLeftArtists,
  ]);

  const handleCategoriesMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setIsDraggingCategories(true);
    setDragStartXCategories(event.clientX);
    setScrollLeftCategories(
      categoriesRef.current ? categoriesRef.current.scrollLeft : 0
    );
  };

  const handleArtistsMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingArtists(true);
    setDragStartXArtists(event.clientX);
    setScrollLeftArtists(
      artistsRef.current ? artistsRef.current.scrollLeft : 0
    );
  };

  const [categories, setCategories] = useState<CategoryCardProps[]>([]);
  const [tracks, setTracks] = useState<TrackCardProps[]>([]);
  const [artists, setArtists] = useState<ArtistCardProps[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/home/categories");

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTracks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tracks");

        setTracks(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await axios.get("/api/artists");

        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchCategories();
    fetchTracks();
    fetchArtists();
  }, []);

  return (
    <Container maxWidth="lg" style={{ paddingTop: "24px" }}>
      <Typography
        variant="h3"
        align="center"
        style={{ marginBottom: "16px", color: "lightblue" }}
      >
        Welcome to SpaceTune
      </Typography>
      <Typography
        variant="body1"
        align="center"
        style={{ marginBottom: "24px", color: "white" }}
      >
        Explore the universe of music with SpaceTune. Listen to your favorite
        tracks from various genres and artists.
      </Typography>

      {/* Categories section */}
      <div
        ref={categoriesRef}
        style={{
          display: "flex",
          gap: "25px",
          marginBottom: "24px",
          overflowX: "hidden",
        }}
        onMouseDown={handleCategoriesMouseDown}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              width: "300px",
              margin: "20px 40px 20px 0px",
              pointerEvents: isDraggingCategories ? "none" : "auto",
            }}
          >
            <CategoryCard
              name={category.name}
              image={category.image}
              id={category.id}
            />
          </div>
        ))}
      </div>

      {/* Artists section */}
      <div
        ref={artistsRef}
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          overflowX: "hidden",
        }}
        onMouseDown={handleArtistsMouseDown}
      >
        {artists.map((artist) => (
          <div
            key={artist.id}
            style={{ pointerEvents: isDraggingArtists ? "none" : "auto" }}
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
          </div>
        ))}
      </div>

      {/* Songs section */}
      <div style={{ display: "flex", flexWrap: "wrap", margin: "auto" }}>
        {tracks.map((track) => (
          <div
            key={track.id}
            style={{ flex: "0 0 50%", maxWidth: "50%", marginBottom: "15px" }}
          >
            <TrackCard
              id={track.id}
              name={track.name}
              artist_name={track.artist_name}
              artist_image={track.artist_image}
              track_image={track.track_image}
              duration={track.duration}
              handleClick={() => {}}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
