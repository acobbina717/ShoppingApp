import { faker } from "@faker-js/faker";
import Directory from "./Components/Directory/Directory";

type AppProps = {};

export interface Categories {
  id: string;
  title: string;
  imageUrl: string;
}

const App = (props: AppProps) => {
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

export default App;
