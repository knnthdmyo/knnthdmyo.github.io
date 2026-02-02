import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'knnthdmyo - Frontend Engineer | React & React Native Developer',
    template: '%s | knnthdmyo',
  },
  description: '6+ years shipping React web apps and React Native mobile experiences. Building fast, accessible interfaces with TypeScript, Redux, and Tailwind. Specializing in SaaS dashboards, PWAs, and cross-platform apps.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'React Native',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Mobile Development',
    'Portfolio',
    'knnthdmyo',
    'Kenneth Damayo',
  ],
  authors: [{ name: 'Kenneth Damayo (knnthdmyo)' }],
  creator: 'Kenneth Damayo',
  publisher: 'Kenneth Damayo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://knnthdmyo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://knnthdmyo.com/',
    title: 'knnthdmyo - Frontend Engineer | React & React Native Developer',
    description: '6+ years shipping React web apps and React Native mobile experiences. Building fast, accessible interfaces with TypeScript, Redux, and Tailwind.',
    siteName: 'knnthdmyo Portfolio',
    images: [
      {
        url: '/images/favicon.png',
        width: 1200,
        height: 630,
        alt: 'knnthdmyo - Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'knnthdmyo - Frontend Engineer | React & React Native Developer',
    description: '6+ years shipping React web apps and React Native mobile experiences. Building fast, accessible interfaces with TypeScript, Redux, and Tailwind.',
    creator: '@knnthdmyo',
    images: ['/images/favicon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        
        {/* Tawk.to Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6954242c0c14261985ec0a52/1jdoaqk7v';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

