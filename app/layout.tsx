import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <UserButton showName />
          </header>
          <main>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <ToasterProvider />
              <ModalProvider />
              {children}
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}



import { clerkMiddleware } from "@clerk/nextjs/server";
import { ModalProvider } from '@/providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';

clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};