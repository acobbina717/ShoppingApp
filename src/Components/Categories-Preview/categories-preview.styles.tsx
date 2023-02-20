import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
  },

  imageSection: {
    //  padding: theme.spacing.md,
    //  display: "flex",
    //  alignItems: "center",
    //  justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));
