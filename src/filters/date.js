import moment from 'moment';

export default (value) => {
    const date = moment(value).format('DD/MM/YYYY HH:MM');
    return date;
}