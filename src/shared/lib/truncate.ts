export function truncate(string: string) {
    if (string.length < 18) return string;

    return string.substring(0, 8) + '...' + string.substring(string.length - 10);
}
