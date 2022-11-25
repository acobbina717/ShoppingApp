import { useContext } from "react";
import ProductCard from "../../Components/Product-Card/ProductCard";
import "./shop.styles.scss";
import { ProductsContext } from "../../Contexts/products.context";

type Props = {};

const Shop = (props: Props) => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
};

export default Shop;
