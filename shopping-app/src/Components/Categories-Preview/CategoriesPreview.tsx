import { Fragment } from "react";

import { useAppSelector } from "../../Utils/Redux/hooks/hooks";
import CategoryPreview from "../Category-Preview/CategoryPreview";

const CategoriesPreview = () => {
  const { categoriesMap } = useAppSelector((state) => state.categories);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
