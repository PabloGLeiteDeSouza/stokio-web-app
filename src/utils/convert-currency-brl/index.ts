export default function convertCurrencyBrlToNumber(value: string): number {
    return parseFloat(value.replace(/[^\d.,]/g, '').replace(/,/g, ''));
}