import { Categories } from "../../App";
import CategoryItem from "../Category-Item/CategoryItem";
import "./directory.styles.scss";

type DirectoryProps = {
  categories: Categories[];
};

const Directory = ({ categories }: DirectoryProps) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default Directory;
