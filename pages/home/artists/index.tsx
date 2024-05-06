import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import CategoryCard from "@/components/musicCards/CategoryCard";
import { useRouter } from "next/router";
import TrackCard from "@/components/musicCards/TrackCard";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/home/categories");

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Artists
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {categories.map((category: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={category.id}
            sx={{ display: "flex" }}
          >
            <CategoryCard
              name={category.name}
              image={category.image}
              id={category.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
