import { SiNextdotjs } from '@icons-pack/react-simple-icons'
import { useTranslations } from '@tszhong0411/i18n/client'
import { HeartIcon } from 'lucide-react'

const FavoriteFramework = () => {
  const t = useTranslations()

  return (
    <div className='shadow-feature-card dark:shadow-feature-card-dark flex flex-col gap-6 rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <HeartIcon className='size-[18px]' />
        <h2 className='text-sm font-light'>{t('homepage.about-me.stacks')}</h2>
      </div>
      <div className='flex items-center justify-center'>
        <SiNextdotjs size={80} className='text-zinc-800 dark:text-zinc-200' />
      </div>
    </div>
  )
}

export default FavoriteFramework
