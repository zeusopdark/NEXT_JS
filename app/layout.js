import "../styles/app.scss"
import Header from "./Header"
import { Provider } from "@/components/Clients";
export const metadata = {
  title: 'Todo App',
  description: 'This a simple project for learning purpose',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <>
            <Header />
            {children}
          </>
        </Provider>
      </body>
    </html>
  )
}
