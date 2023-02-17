import { createStyles } from "@mantine/core";

export const useStyles = createStyles({
  container: {
    // width: 45,
    height: 45,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  itemCount: {
    position: "absolute",
    fontSize: 10,
    fontWeight: "bold",
    bottom: 12,
  },
  emptyMessage: {
    fontSize: 18,
    margin: "50px auto",
  },
  cartItems: {
    height: 240,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
  },
});
