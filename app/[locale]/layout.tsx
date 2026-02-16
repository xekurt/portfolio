import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Outfit, Vazirmatn } from 'next/font/google';
import "./globals.css";

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

const vazirmatn = Vazirmatn({
    subsets: ['arabic'],
    variable: '--font-vazirmatn',
    display: 'swap',
});

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} className="scroll-smooth">
            <body className={`${locale === 'fa' ? vazirmatn.variable : outfit.variable} ${locale === 'fa' ? 'font-iranian' : 'font-sans'} antialiased section-spacing`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
