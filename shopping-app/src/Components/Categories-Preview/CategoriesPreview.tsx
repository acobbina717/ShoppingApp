import { Fragment, useEffect } from "react";

import { getCategoriesAndDocuments } from "../../Utils/Firebase/firebase.utils";
import { setCategoriesMap } from "../../Utils/Redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../Utils/Redux/hooks/hooks";
import CategoryPreview from "../Category-Preview/CategoryPreview";

const CategoriesPreview = () => {
  const { categoriesMap } = useAppSelector((state) => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoryMap));
    };

    getCategoriesMap();
  }, []);

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
