import './globals.css'

const GTM_ID = 'GTM-WFVG6F37'

export const metadata = {
  title: 'Zohaib — Full-Stack Developer & Software Engineer',
  description:
    'Zohaib is a full-stack developer and software engineer building reliable digital products across frontend, backend, CMS, and database technologies.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: '/apple-icon.png',
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
  themeColor: '#F7F7F8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem('portfolio-theme');
                  var useLight = savedTheme ? savedTheme === 'light' : true;
                  document.documentElement.classList.toggle('light', useLight);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
