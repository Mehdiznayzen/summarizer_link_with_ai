import { format, isToday, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Locale } from 'date-fns';

const DateFormat = ({ created_at } : { created_at : any }) => {
    const date = new Date(created_at);
    const locale: Locale = fr as Locale;
    let displayDate;

    if (isNaN(date.getTime())) {
        return <p>Date invalide</p>;
    }

    if (isToday(date)) {
        displayDate = `Aujourd'hui à ${format(date, 'HH:mm', { locale })}`;
    } else if (isYesterday(date)) {
        displayDate = `Hier à ${format(date, 'HH:mm', { locale })}`;
    } else {
        displayDate = `Le ${format(date, 'dd MMMM yyyy à HH:mm', { locale })}`;
    }

    return <p>{displayDate}</p>;
};

export default DateFormat;
