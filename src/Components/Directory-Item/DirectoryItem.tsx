import { Card, Overlay, Stack, Text } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useStyles } from "./directory-item.styles";

import type { Directory } from "../Directory";

type DirectoryProps = {
  category: Directory;
};

const DirectoryItem = ({ category }: DirectoryProps) => {
  const { classes, theme } = useStyles();
  const { imageUrl, title, route } = category;

  return (
    <Card
      h={380}
      radius="md"
      shadow="lg"
      p="lg"
      component={Link}
      href={route}
      className={classes.card}
    >
      <Card.Section>
        <Image src={imageUrl} alt={title} fill className={classes.image} />
      </Card.Section>

      <Overlay
        zIndex={0}
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)"
      />

      <div className={classes.content}>
        <Stack color="white">
          <Text
            size="lg"
            weight={700}
            color={theme.white}
            transform="capitalize"
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
