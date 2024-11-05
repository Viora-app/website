import {ReactNode} from 'react';
import type {Metadata} from 'next';
import NextImage from 'next/image';

import Providers from '../context';
import {Routes} from '@/app/config/routes';
import {Icon} from '@/app/components/Elements';
import {Link} from '@/app/components/Polyfills';
import logo from '../../public/images/app-logo-white.svg';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Viora',
  description: 'Empowering artists, connecting superfans',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        </head>
      <body className="bg-bodyBg font-poppins">
        <section className="w-full h-screen flex flex-row justify-center items-center">
          <section className="max-w-[970px] max-h-[800px] w-[90vw] h-[90vh] flex flex-col">
            <header className="h-[55px] w-full flex flex-row nowrap pb-[20px] pl-[20px]">
              <NextImage src={logo} alt="Viora" width="32" />
              <h1 className="font-poppins text-bodyColor text-3xl font-bold pl-4">Viora</h1>
            </header>
            <div className="flex flex-col md:flex-row nowrap flex-1 h-full pt-[55px] relative top-[-55px]">
              <aside className="h-[76px] w-auto md:w-[76px] md:h-auto flex flex-row md:flex-col mt-[30px] md:mt-0 md:mr-[30px] justify-between order-2 md:order-1">
                <div className="bg-wrapperBg border-wrapperBg rounded-3xl border-[13px] overflow-hidden flex flex-row md:flex-col gap-4">
                  <Link to={{screen: Routes.Home}} className="block w-[50px] h-[50px] p-[13px] bg-menuBg rounded-xl"><Icon name="Home" size={28} color="#fff" /></Link>
                  <Link to={{screen: Routes.Profile}} className="block w-[50px] h-[50px] p-[13px] bg-menuBg rounded-xl"><Icon name="Profile" size={28} color="#fff" /></Link>
                  <Link to={{screen: Routes.Settings}} className="block w-[50px] h-[50px] p-[13px] bg-menuBg rounded-xl"><Icon name="Settings" size={28} color="#fff" /></Link>
                </div>
                <div className="bg-wrapperBg border-wrapperBg rounded-3xl border-[13px] overflow-hidden">
                  <Link to={{screen: Routes.Logout}} className="block w-[50px] h-[50px] p-[13px] bg-menuBg rounded-xl"><Icon name="logout" size={28} color="#fff" /></Link>
                </div>
              </aside>
              <main id="app-main" className="h-full relative bg-wrapperBg border-wrapperBg rounded-3xl border-[13px] overflow-hidden grow order-1 md:order-2">
                <Providers>
                  {children}
                </Providers>
              </main>
            </div>
          </section>
        </section>
      </body>
    </html>
  );
}
