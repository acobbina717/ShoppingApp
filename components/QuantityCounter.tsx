import { createStyles, ActionIcon, Group, Paper } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `6px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,

    "&:focus-within": {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  control: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,

    "&:disabled": {
      borderColor:
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: "transparent",
    },
  },

  input: {
    textAlign: "center",
    paddingRight: `${theme.spacing.sm}px !important`,
    paddingLeft: `${theme.spacing.sm}px !important`,
    height: 28,
    flex: 1,
  },
}));

type Props = {
  // eslint-disable-next-line react/require-default-props
  max?: number;
  quantity: number;
  addToCart: () => void;
  subtractFromCart: () => void;
};

const QuantityCounter = ({
  // eslint-disable-next-line no-unused-vars
  max = 10,
  quantity,
  addToCart,
  subtractFromCart,
}: Props) => {
  const { classes, theme } = useStyles();

  return (
    <Group
      position="center"
      p={`6px ${theme.spacing.sm}px`}
      style={{
        border: `1px solid ${theme.colors.gray[7]}`,
        borderRadius: theme.radius.md,
      }}
    >
      <ActionIcon<"button">
        size={28}
        variant="transparent"
        onClick={subtractFromCart}
        disabled={quantity === 1}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <IconMinus size={16} stroke={1.5} />
      </ActionIcon>

      <Paper
        style={{
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        }}
      >
        {quantity}
      </Paper>

      <ActionIcon<"button">
        size={28}
        variant="transparent"
        onClick={addToCart}
        // disabled={quantity === max}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <IconPlus size={16} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};

export default QuantityCounter;
