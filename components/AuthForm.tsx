import {
  Anchor,
  Button,
  Divider,
  Group,
  Loader,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { FormEvent, useState } from "react";
import { GoogleButton } from "./google-button/GoogleButton";
import { auth } from "../utils/mutations";

const AuthForm = (props: PaperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [type, toggle] = useToggle(["signin", "signup"]);
  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },

    // validate: {
    //   email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    //   password: (val) =>
    //     val.length <= 6
    //       ? "Password should include at least 6 characters"
    //       : null,
    // },
  });

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, firstName, lastName, password } = form.values;

    try {
      if (type === "signup") {
        await auth("/signup", {
          email,
          password,
          firstName,
          lastName,
        });
      }
      const user = await auth("/signin", { email, password });
      if (user) {
        setIsLoading(false);
        router.push("/checkout");
      }
    } catch (error) {
      if (error) console.log(error);
    }
  };
  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Group grow mb="md" mt="md">
        {/* <GoogleButton clickHandler={signInWithGoogle} props={{ radius: "xl" }}>
          Google
        </GoogleButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={handleOnSubmit}>
        <Stack>
          {type === "signup" && (
            <>
              <TextInput
                label="First Name"
                placeholder="First name"
                value={form.values.firstName}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
              />
              <TextInput
                label="Last Name"
                placeholder="Last name"
                value={form.values.lastName}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
              />
            </>
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />
        </Stack>

        <Group position="apart" mt="xl">
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

          <Button variant="outline" type="submit">
            {isLoading ? <Loader color="blue" size="sm" /> : upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default AuthForm;
