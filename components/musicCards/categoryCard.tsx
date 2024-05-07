import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export interface CategoryCardProps {
  id: number;
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image }) => {
  const router = useRouter();
  //Routing Problem
  const handleClick = () => {
    router.push(`/home/categories/${id}`);
  };

  return (
    <Card
      sx={{
        width: 350,
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height={200}
          image={"/" + image}
          alt={name}
        />
        <CardContent
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "#FF6500",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: "1.7rem",
            }}
            className="concert-one-regular"
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
