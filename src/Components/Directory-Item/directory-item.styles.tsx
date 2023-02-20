import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef("image");

  return {
    card: {
      position: "relative",
      [`&:hover .${image}`]: {
        transform: "scale(1.03)",
      },
    },

    image: {
      objectFit: "cover",
      objectPosition: "center",
      ref: image,
      transition: "transform 500ms ease",
    },

    content: {
      top: "25%",
      left: "25%",
      height: "50%",
      width: "50%",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.fn.rgba(theme.colors.dark[9], 0.65),
    },
  };
});
