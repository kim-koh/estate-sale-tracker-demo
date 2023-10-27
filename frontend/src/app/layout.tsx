import './globals.css'
import './styles/design_tokens.css';
import type { Metadata } from 'next'

import {Providers} from './providers';

export const metadata: Metadata = {
  title: 'Yard Sale Inventory Tracker',
  description: 'Created to help private individuals who are running estate/yard/bake sales etc.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Providers>{children}</Providers>
      </body>
    </html>
  )
}
