import { Card, Center, Container, Grid, Title } from "@mantine/core";
import React from "react";
import Image from "next/image";
import Directory from "../src/components/directory/Directory";

type Props = {};

const Home = (props: Props) => {
  const products = new Array(30).fill(1);
  return (
    <div>
      <Directory />
      <Container size="lg">
        <Title order={2}>Products</Title>
        <div>
          <Center>
            <Title order={3}>Products List</Title>
          </Center>
          <Grid grow>
            {products.map((product) => (
              <Grid.Col span={3}>
                <Card>
                  <Image src={""} alt={""} />
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Home;
