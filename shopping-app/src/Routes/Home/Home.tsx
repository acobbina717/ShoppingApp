import { faker } from "@faker-js/faker";
import Directory from "../../Components/Directory/Directory";

type HomeProps = {};

export interface Categories {
  id: string;
  title: string;
  imageUrl: string;
}

const Home = (props: HomeProps) => {
  const categories: Categories[] = [
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      imageUrl: faker.image.fashion(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      imageUrl: faker.image.fashion(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      imageUrl: faker.image.fashion(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      imageUrl: faker.image.fashion(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      imageUrl: faker.image.fashion(),
    },
  ];

  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
