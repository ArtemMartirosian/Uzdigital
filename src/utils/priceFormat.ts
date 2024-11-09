export const priceFormat = (price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};