import {
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { FormEvent, useState } from "react";

import { upperFirst, useToggle } from "@mantine/hooks";
import { signIn } from "next-auth/react";
import { GoogleButton } from "./google-button/GoogleButton";

const AuthForm = () => {
  const [type, toggle] = useToggle(["signin", "signup"]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, firstName, lastName, password } = form.values;

    if (type === "signup") {
      const name = [firstName.trim(), lastName.trim()].join(" ");
      await signIn("credentials", {
        email,
        password,
        name,
        type,
        redirect: false,
      });
    }
    await signIn("email", { email, password, redirect: false });
  };

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

        <form onSubmit={submitHandler}>
          <Stack>
            {type === "signup" && (
              <>
                <TextInput
                  required
                  label="First Name"
                  placeholder="John"
                  value={form.values.firstName}
                  onChange={(event) =>
                    form.setFieldValue("firstName", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  required
                  label="Last Name"
                  placeholder="Doe"
                  value={form.values.lastName}
                  onChange={(event) =>
                    form.setFieldValue("lastName", event.currentTarget.value)
                  }
                  radius="md"
                />
              </>
            )}
            <TextInput
              required
              label="Email"
              placeholder="johndoe@email.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="**********"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group position="center" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "signup"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button disabled={isLoading} fullWidth type="submit" radius="xl">
              {isLoading ? <Loader /> : upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Container>
    </Paper>
  );
};

export default AuthForm;
