// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Grid, Typography } from "@mui/material";
// import CategoryCard from "@/components/musicCards/CategoryCard";

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/categories");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <Container>
//       <Typography variant="h2" align="center" gutterBottom>
//         Categories
//       </Typography>
//       <Grid container spacing={3}>
//         {categories.map((category: any) => (
//           <Grid item xs={12} sm={6} md={4} key={category.id}>
//             <CategoryCard title={category.name} imageUrl={category.image} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default CategoriesPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import CategoryCard from "@/components/musicCards/CategoryCard";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Categories
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
            <CategoryCard title={category.name} imageUrl={category.image} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
