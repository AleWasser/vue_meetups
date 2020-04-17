import moment from 'moment';

export default (value) => {
    const date = moment(value).format('DD/MM/YYYY hh:mm');
    return date;
}