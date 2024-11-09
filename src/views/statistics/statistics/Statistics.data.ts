import dayjs from 'dayjs'

export const queryTimeObj = {
  today: function(){
      const end = dayjs().format('YYYY-MM-DD')
      const start = dayjs().format('YYYY-MM-DD')
      return [start, end]
  },
  yesterday: function(){
      const end = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      const start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      return [start, end]
  },
  beforeYesterday: function(){
      const end = dayjs().subtract(2, 'day').format('YYYY-MM-DD')
      const start = dayjs().subtract(2, 'day').format('YYYY-MM-DD')
      return [start, end]
  },
  day30: function(){
      const end = dayjs().format('YYYY-MM-DD')
      const start = dayjs().subtract(30, 'day').format('YYYY-MM-DD')
      return [start, end]
  },
  thisWeek: function(){
      const end = dayjs().endOf('week').format('YYYY-MM-DD')
      const start = dayjs().startOf('week').format('YYYY-MM-DD')
      return [start, end]
  },
  thisMonth: function(){
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      return [start, end]
  },
  lastMonth: function(){
      const end = dayjs().add(-1, 'month').endOf('month').format('YYYY-MM-DD')
      const start = dayjs().add(-1, 'month').startOf('month').format('YYYY-MM-DD')
      return [start, end]
  },
  thisYear: function(){
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      return [start, end]
  },
  lastYear: function(){
      const end = dayjs().add(-1, 'year').endOf('year').format('YYYY-MM-DD')
      const start = dayjs().add(-1, 'year').startOf('year').format('YYYY-MM-DD')
      return [start, end]
  }
}

