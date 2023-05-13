import { type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)
