import Button from "../Button/Button";
import { ProductsObj } from "../../Contexts/products.context";
import "./product-card.styles.scss";
type ProductCardProps = {
  product: ProductsObj;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to cart</Button>
    </div>
  );
};

export default ProductCard;
