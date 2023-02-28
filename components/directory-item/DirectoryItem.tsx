import { Card, Overlay, Stack, Text, Image } from "@mantine/core";
import Link from "next/link";
import { useStyles } from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { classes } = useStyles();
  const { imageUrl, title, route } = category;

  return (
    <Card
      radius="md"
      shadow="lg"
      component={Link}
      href={route}
      className={classes.card}
    >
      <Card.Section>
        <Overlay gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)" />
        <Image
          src={imageUrl}
          alt={title}
          height={380}
          className={classes.image}
        />
        <Stack className={classes.content}>
          <Text size="lg" weight={700} transform="capitalize">
            {title}
          </Text>
          <Text size="sm">Shop Now</Text>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default DirectoryItem;
