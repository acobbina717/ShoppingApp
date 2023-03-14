import { Container } from "@mantine/core";

import { GoogleButton } from "../../components/google-button/GoogleButton";

const AuthPage = () => {
  return (
    <Container>
      <GoogleButton props={{ radius: "xl", fullWidth: true }}>
        Google
      </GoogleButton>
    </Container>
  );
};

export default AuthPage;
