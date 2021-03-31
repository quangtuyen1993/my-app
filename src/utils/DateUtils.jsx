

export default class DateUtils {
    static  setHourBeginOfDate(dateStr) {
      var date=new Date(dateStr).setHours(0,0,0)
      return date
    }

    static  setHourEndDay(dateStr) {
      var date=new Date(dateStr).setHours(23,59,59)
      return date
    }
}


export const SchedulerTask=()=>{
  
}
