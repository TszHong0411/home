import { useFormatter, useTranslations } from '@tszhong0411/i18n/client'

import { dayjs } from '@/utils/dayjs'

type Options = {
  relative?: boolean
  formatOptions?: Parameters<ReturnType<typeof useFormatter>['dateTime']>['1']
}

export const useFormattedDate = (date: Date | string, options: Options = {}) => {
  const {
    relative = false,
    formatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  } = options

  const format = useFormatter()
  const t = useTranslations('common')
  const now = new Date()

  const convertedDate = typeof date === 'string' ? new Date(date) : date

  if (relative) {
    const weeksDiff = dayjs().diff(date, 'week')

    return Math.abs(weeksDiff) > 1
      ? `${t('on')} ${format.dateTime(convertedDate, formatOptions)}`
      : format.relativeTime(convertedDate, now)
  } else {
    return format.dateTime(convertedDate, formatOptions)
  }
}
