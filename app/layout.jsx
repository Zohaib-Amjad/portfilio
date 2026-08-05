import './globals.css'

export const metadata = {
  title: 'Zohaib — Full-Stack Developer & Software Engineer',
  description:
    'Zohaib is a full-stack developer and software engineer building reliable digital products across frontend, backend, CMS, and database technologies.',
  icons: {
    icon: '/favicon.png',
  },
  authors: [{ name: 'Zohaib' }],
  openGraph: {
    type: 'website',
    title: 'Zohaib — Full-Stack Developer & Software Engineer',
    description:
      'Full-stack engineering, content platforms, and product experiences built with intent.',
  },
  twitter: {
    card: 'summary',
    title: 'Zohaib — Full-Stack Developer & Software Engineer',
    description:
      'Full-stack engineering, content platforms, and product experiences built with intent.',
  },
}

export const viewport = {
  themeColor: '#08090B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem('portfolio-theme');
                  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  document.documentElement.classList.toggle(
                    'light',
                    savedTheme ? savedTheme === 'light' : prefersLight
                  );
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
