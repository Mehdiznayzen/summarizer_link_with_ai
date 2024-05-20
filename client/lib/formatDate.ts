import { format, isToday, isYesterday } from 'date-fns';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return "Aujourd\'hui";
    } else if (isYesterday(date)) {
        return 'Hier';
    } else {
        return 'Le ' + format(date, 'dd/MM/yyyy');
    }
};

export default formatDate
