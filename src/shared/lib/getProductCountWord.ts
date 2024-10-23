export function getProductCountWord(count: number) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return `${count} товар`;
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return `${count} товара`;
    } else {
        return `${count} товаров`;
    }
}
