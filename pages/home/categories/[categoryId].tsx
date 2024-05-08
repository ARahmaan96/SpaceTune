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
          <Card>
            <CardMedia
              component="img"
              image={`/${categoryData?.image}`}
              alt={categoryData?.name}
              sx={{
                maxHeight: 350,
                objectFit: "cover",
                width: "100%",
              }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Category: {categoryData.name}
              </Typography>
            </CardContent>
          </Card>
          {tracks.map((track: any) => (
            <TrackCard
              key={track.id}
              {...track}
              handleClick={() => console.log("Track clicked")}
            />
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CategoryPage;
