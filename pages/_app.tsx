import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { TemplateHeader } from '../templates/templateHeader'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../templates/templateFooter';
import { GlobalProvider } from '../context/GlobalContext';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>  
      <GlobalProvider>
        <TemplateHeader>
          <Component {...pageProps} />
        </TemplateHeader>
        <Footer/>
      </GlobalProvider>
    </>
     
  )
}

export default MyApp
