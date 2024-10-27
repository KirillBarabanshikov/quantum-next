export function getCountWord(count: number, word: string) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return `${count} ${word}`;
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return `${count} ${word}а`;
    } else {
        return `${count} ${word}ов`;
    }
}
