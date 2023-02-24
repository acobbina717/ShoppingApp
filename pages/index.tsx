import { Card, Center, Container, Grid, Title, Image } from "@mantine/core";
import React from "react";
import Directory from "../components/directory/Directory";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <Directory />
      <Container size="lg">
        {/* <Title order={2}>Products</Title>
        <div>
          <Center>
            <Title order={3}>Products List</Title>
          </Center>
          <Grid grow>
            {products.map((product, idx) => (
              <Grid.Col key={idx} span={3}>
                <Card>
                  <Image src={""} alt={""} />
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div> */}
      </Container>
    </div>
  );
};

export default Home;
