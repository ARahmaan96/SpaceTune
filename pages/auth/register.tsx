import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession, signIn } from "next-auth/react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const router = useRouter();
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post("/api/user/register", data);

      if (response.status == 200) {
        console.log("File uploaded successfully");
        // login
        const result = await signIn("credentials", {
          email: data.get("email"),
          password: data.get("password"),
          redirect: false, // Redirect to callback page manually
        });
        // redirect to home
        router.push("/");
      } else {
        alert(response.data);
        console.log(response);
      }
    } catch (error) {
      alert(error);
      console.error("Error uploading file:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          paddingY: 9,
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: "rgba(256, 256, 256, 0.6)",
            borderRadius: "7px",
            border: "solid 2px #ddd",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  width: "100",
                  alignItems: "center",
                }}
              >
                <input
                  accept="image/*"
                  id="contained-button-file"
                  name="image"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="contained-button-file"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <CameraAltIcon
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 132,
                      zIndex: 1,
                      width: 25,
                      height: 25,
                      padding: "3px",
                      backgroundColor: "#ddd",
                      borderRadius: "50px",
                    }}
                  />
                  <Avatar
                    sx={{
                      m: 1,
                      bgcolor: "secondary.main",
                      height: 100,
                      width: 100,
                    }}
                    src={selectedFile ? selectedFile.toString() : undefined}
                  ></Avatar>
                </label>
              </Grid>

              <Typography
                component="h1"
                variant="h5"
                sx={{ marginY: 2, textAlign: "center" }}
              >
                Sign up
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>

              <Button
                onClick={() => signIn("google")}
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 1,
                  mb: 1,
                  backgroundColor: "#DB4437", // Google Red
                  "&:hover": {
                    backgroundColor: "#c1351a", // Slightly darker shade
                  },
                }}
              >
                <GoogleIcon style={{ marginRight: 5 }} />
                Sign In with Google
              </Button>
              <Button
                onClick={() => signIn("github")}
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 1,
                  mb: 1,
                  backgroundColor: "black", // GitHub Black
                  "&:hover": {
                    backgroundColor: "#1f2428", // Slightly darker shade
                  },
                }}
              >
                <GitHubIcon style={{ marginRight: 5 }} />
                Sign In with GitHub
              </Button>
              <Button
                onClick={() => signIn("facebook")}
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 1,
                  mb: 2,
                  backgroundColor: "#3b5998", // Facebook Blue
                  "&:hover": {
                    backgroundColor: "#2d4373", // Slightly darker shade
                  },
                }}
              >
                <FacebookIcon style={{ marginRight: 5 }} />
                Sign In with Facebook
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
