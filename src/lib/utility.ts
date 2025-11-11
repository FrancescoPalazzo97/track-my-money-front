import type dayjs from "dayjs";

const symbols: string = '<>"\';(){}[]|\\`&$*?~^%!@#+=';

export const validateChars = (input: string) => symbols.split('').some(s => input.includes(s));

export const calculateDateRange = (date: dayjs.Dayjs): { startDate: string, endDate: string } => {
    return {
        startDate: date.startOf('month').format('YYYY-MM-DD'),
        endDate: date.endOf('month').format('YYYY-MM-DD')
    };
}