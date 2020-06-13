import moment from 'moment'

export default LocalTime = (time) => {
    const localTime = moment.utc(time).toDate()
    const md = moment(localTime).format('M月D日')
    const hm = moment(localTime).format('H:mm')
    return {
        month: md,
        hours: hm
    }
}
