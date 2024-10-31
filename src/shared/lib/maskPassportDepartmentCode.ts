export function maskPassportDepartmentCode(value: string) {
    let inputValue = value.replace(/\D/g, '');

    if (inputValue.length > 3) {
        inputValue = inputValue.slice(0, 3) + '-' + inputValue.slice(3, 6);
    }

    return inputValue;
}
