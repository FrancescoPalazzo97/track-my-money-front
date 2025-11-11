import dayjs, { type ConfigType } from 'dayjs';
import 'dayjs/locale/it';

// Configura dayjs con la locale italiana
dayjs.locale('it');

/**
 * Custom hook per utilizzare dayjs con configurazione italiana
 * @param date - Data da formattare (string, Date, dayjs object, etc.)
 * @returns Istanza dayjs configurata con data locale italiana
 */
export default function useDayjs(date?: ConfigType) {
    return date ? dayjs(date) : dayjs();
}