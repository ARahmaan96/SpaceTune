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
  const [selectedFile, setSelectedFile] = React.useState<
    string | ArrayBuffer | null
  >(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setSelectedFile(e?.target?.result ?? null);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
        <Grid
          container
          direction="column"
          sx={{ overflowX: "hidden", paddingBottom: 100 }}
        >
          <Grid item xs={12} md={6} overflow={"hidden"}>
            <img
              alt="avatar"
              style={{
                width: "calc(100vw - 240px)",
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
              marginX: 10,
              width: "calc(100vw - 400px)",
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
