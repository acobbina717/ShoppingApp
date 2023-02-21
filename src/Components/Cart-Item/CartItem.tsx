import { Image } from "@mantine/core";
import type { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import { useStyles } from "./cart-item.styles";

type CartItemProps = {
  cartItem: Product;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { classes } = useStyles();
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className={classes.container}>
      <Image className={classes.img} src={imageUrl} alt={`${name}`} />
      <div className={classes.itemDetails}>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
