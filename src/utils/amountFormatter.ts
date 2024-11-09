export const amountFormatter = (amount: number) => {
  return new Intl.NumberFormat("ru").format(amount);
};
