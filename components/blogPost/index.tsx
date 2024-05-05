import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";

export default function BlogPost({ blogPost }: { blogPost: BlogType }) {
  return (
    <Link href={`/blog/${blogPost.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 310, height: 420 }} elevation={10}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="180"
            image={`${
              blogPost.cover || "https://source.unsplash.com/random?wallpapers"
            }`}
            alt={blogPost.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2,
                height: "65px",
              }}
            >
              {blogPost.title}
            </Typography>
            <Typography variant="h6" component={"h6"} color={"GrayText"}>
              @{blogPost.author}
            </Typography>

            <Typography
              gutterBottom
              variant="body2"
              component="h5"
              color="text.secondary"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2,
                height: "40px",
              }}
            >
              {blogPost.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Open
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
