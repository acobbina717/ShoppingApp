import { Categories } from "../../App";
import "./categort-item.styles.scss";

type CategoryItemProps = {
  category: Categories;
};

const CategoryItem = ({ category: { imageUrl, title } }: CategoryItemProps) => {
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
