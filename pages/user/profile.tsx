import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ProfileCard from "@/components/profileCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

const theme = createTheme();

export default function App() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {/* BACKGROUND */}
        <Grid container direction="column" sx={{ overflowX: "hidden" }}>
          <Grid item xs={12} md={6}>
            <img
              alt="avatar"
              style={{
                width: "calc(100vw - 250px)",
                height: "35vh",
                objectFit: "cover",
                objectPosition: "50% 50%",
                position: "relative",
              }}
              src="https://iris2.gettimely.com/images/default-cover-image.jpg"
            />
          </Grid>

          {/* COMPONENTS */}
          <Grid
            container
            direction={{ xs: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
            sx={{
              position: "absolute",
              top: "20vh",
            }}
          >
            {/* PROFILE CARD */}
            <Grid item xs={10}>
              <ProfileCard></ProfileCard>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
