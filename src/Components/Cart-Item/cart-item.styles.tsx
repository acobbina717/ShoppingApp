import { createStyles } from "@mantine/core";

export const useStyles = createStyles({
  container: {
    display: "flex",
    width: "100%",
    height: 80,
    marginBottom: 15,
  },
  img: {
    width: "30%",
  },
  itemDetails: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "10px 20px",
  },
});

// export const CartItemContainer = styled.div`
//   width: 100%;
//   display: flex;
//   height: 80px;
//   margin-bottom: 15px;
//   img {
//     width: 30%;
//   }
// `;

// export const ItemDetails = styled.div`
//   width: 70%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   padding: 10px 20px;
//   span {
//     font-size: 12px;
//   }
// `;
