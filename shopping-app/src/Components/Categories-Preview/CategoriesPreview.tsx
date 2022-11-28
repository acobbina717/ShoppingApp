import { Fragment, useContext } from "react";
import { CategoriesContext, Products } from "../../Contexts/categories.context";
import CategoryPreview from "../Category-Preview/CategoryPreview";

type Props = {};

const CategoriesPreview = (props: Props) => {
  const { categoriesMap } = useContext(CategoriesContext);
  const catergories = categoriesMap as unknown as {
    [key: string]: Products[];
  };

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = catergories[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
