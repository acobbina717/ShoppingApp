import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button";
import {
  ProductCardContainer,
  ProductCardFooter,
  ProductName,
  ProductPrice,
} from "./product-card.styles";
import type { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import { useAppDispatch } from "../../Utils/Redux/hooks/hooks";
import { addToCart } from "../../Utils/Redux/features/cart/cartSlice";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;
  const dispatch = useAppDispatch();

  const addProductToCart = () => dispatch(addToCart(product));

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
