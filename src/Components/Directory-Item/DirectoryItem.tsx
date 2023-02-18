import { Card, Overlay, Stack, Text } from "@mantine/core";
import Link from "next/link";

import { useStyles } from "./directory-item.styles";

import type { Directory } from "../directory/Directory";

type DirectoryProps = {
  category: Directory;
};

const DirectoryItem = ({ category }: DirectoryProps) => {
  const { classes, theme } = useStyles();
  const { imageUrl, title, route } = category;

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component={Link}
      href={route}
    >
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <Overlay
        zIndex={0}
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)"
      />

      <div className={classes.content}>
        <Stack color="white">
          <Text
            transform="capitalize"
            size="lg"
            weight={700}
            color={theme.white}
          >
            {title}
          </Text>

          <Text size="sm" color={theme.white}>
            Shop Now
          </Text>
        </Stack>
      </div>
    </Card>
  );
};

export default DirectoryItem;
