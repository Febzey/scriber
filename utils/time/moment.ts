import moment from "moment";
import 'moment-timezone';

export function fromNow(dateString: Date) {
    const timezone = 'America/Winnipeg';
    const date = moment(dateString);
    const formattedDate = date.tz(timezone).fromNow();
    return formattedDate;
}

export function humanFormat(datestring: Date) {
    const date = moment(datestring);
    const formattedDate = date.format("Do MMMM YYYY");
    return formattedDate;
}
