import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import TrackCard, { TrackCardProps } from "@/components/musicCards/TrackCard";

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [categoryData, setCategoryData] = useState<any>(null);
  const [tracks, setTracks] = useState<any>([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get<any>(
          `/api/home/categories/${categoryId}`
        );
        setCategoryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTracks = async () => {
      try {
        const response = await axios.get<any>("/api/tracks");
        setTracks(
          response.data.filter(
            (track: { category_id: string | string[] | undefined }) =>
              track.category_id === categoryId
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (categoryId) {
      fetchCategoryData();
      fetchTracks();
    }
  }, [categoryId]);

  return (
    <div>
      {categoryData ? (
        <>
          <Card style={{marginBottom: "40px", marginTop: "20px"}}>
            <CardMedia
              component="img"
              image={`/${categoryData?.image}`}
              alt={categoryData?.name}
              sx={{
                maxHeight: 350,
                objectFit: "fill",
                width: "500px",
              }}
            />
            <CardContent style={{textAlign: "center"}}>
              <Typography variant="h5" component="div">
                Category: {categoryData.name}
              </Typography>
            </CardContent>
          </Card>
          {tracks.map((track: any) => (
            <div key={track.id} style={{marginBottom: "20px"}}>
            <TrackCard
              {...track}
              handleClick={() => console.log("Track clicked")}
            />
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CategoryPage;
