const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

export function priceFormat(price: number) {
    return formatter.format(price);
}
