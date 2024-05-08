import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession, signIn } from "next-auth/react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";

function SignInSide() {
  const [error, setError] = React.useState<boolean>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Redirect to callback page manually
    });

    if (result) setError(true);
  };

  const { data: session } = useSession();

  const router = useRouter();
  if (session) {
    router.push("/");
    return null;
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: `url('https://source.unsplash.com/random?wallpapers')${""}`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={() => error && setError(false)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={() => error && setError(false)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {error && (
                <Typography variant="body2" sx={{ color: "#d11" }}>
                  Email or Password not valid
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
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

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
