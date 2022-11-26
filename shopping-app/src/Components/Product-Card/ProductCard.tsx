import Button from "../Button/Button";
import { ProductsObj } from "../../Contexts/products.context";
import "./product-card.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";

type ProductCardProps = {
  product: ProductsObj;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;
  const { addToCart } = useContext(CartContext);

  const addProductToCart = () => addToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
