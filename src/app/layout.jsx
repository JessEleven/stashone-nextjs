import { Roboto } from 'next/font/google'
import '../resources/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap'
})

export const metadata = {
  title: 'StashOne',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  description: 'StashOne created with next.js'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} bg-neutral-800 text-neutral-50`}>
        {children}
      </body>
    </html>
  )
}
