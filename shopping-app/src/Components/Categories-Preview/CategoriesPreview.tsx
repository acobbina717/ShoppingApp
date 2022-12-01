import { Fragment } from "react";

import { useAppSelector } from "../../Utils/Redux/hooks/hooks";
import CategoryPreview from "../Category-Preview/CategoryPreview";
import Spinner from "../Spinner/Spinner";

const CategoriesPreview = () => {
  const { categoriesMap, status } = useAppSelector((state) => state.categories);

  return (
    <Fragment>
      {status === "loading" ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
