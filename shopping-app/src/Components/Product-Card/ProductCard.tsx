import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button";
import { Products } from "../../Contexts/categories.context";
import {
  ProductCardContainer,
  ProductCardFooter,
  ProductName,
  ProductPrice,
} from "./product-card.styles";
import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";

type ProductCardProps = {
  product: Products;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;
  const { addToCart } = useContext(CartContext);

  const addProductToCart = () => addToCart(product);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ProductCardFooter>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
      </ProductCardFooter>

      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
