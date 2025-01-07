import { redirect } from '@tszhong0411/i18n/routing'
import { SidebarProvider } from '@tszhong0411/ui'

import AdminHeader from '@/components/admin/admin-header'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { getCurrentUser } from '@/lib/auth'

type LayoutProps = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<Record<string, never>>
  children: React.ReactNode
}

const Layout = async (props: LayoutProps) => {
  const { children } = props
  const { locale } = await props.params
  const session = await getCurrentUser()

  if (!session || session.role !== 'admin') {
    redirect({
      href: '/',
      locale
    })
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className='flex w-full flex-col px-4'>
        <AdminHeader />
        <main className='py-6'>{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
