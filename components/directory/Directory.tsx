import { Container, Grid } from "@mantine/core";
import DirectoryItem from "../directory-item/DirectoryItem";
import { directoryCategories } from "./data";

const Directory = () => {
  return (
    <Container fluid>
      <Grid
        // bg={theme.colors.dark[0]}
        grow
        gutter="xs"
      >
        {directoryCategories.map((category) => {
          return (
            <Grid.Col key={category.id} span={7} sm={4}>
              <DirectoryItem category={category} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Directory;
