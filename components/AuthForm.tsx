import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import { GoogleButton } from "./google-button/GoogleButton";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  // const submitHandler = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const { email } = form.values;

  //   await signIn("email", { email, redirect: false });
  // };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Container size="xs" mt={70}>
        <Box>
          <GoogleButton props={{ radius: "xl", fullWidth: true }}>
            Google
          </GoogleButton>
        </Box>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        {/* <form onSubmit={submitHandler}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
          </Stack>

          <Group position="center" mt="xl">
            <Button disabled={isLoading} fullWidth type="submit" radius="xl">
              {isLoading ? <Loader /> : "Login"}
            </Button>
          </Group>
        </form> */}
      </Container>
    </Paper>
  );
};

export default AuthForm;
