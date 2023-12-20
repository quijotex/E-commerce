import { Outlet } from "react-router-dom"
import LinkedIn from '../src/assets/LinkedIn.svg'
import GitHub from '../src/assets/GitHub.svg'

const FooterLayout = () => {
    return(
        <div className="layout">
                <Outlet/>
            <footer className="footer">
                <h1>Created by</h1>
                <div className="footer__developers">
                    <div className="developer-Mario">
                        <h2>Mario Martínez</h2>
                        <a name="LinkedIn" href="https://www.linkedin.com/in/mario-mart%C3%ADnez-961393189/" target="_blank" rel="noreferrer"><img src={LinkedIn} alt="LinkedIn"/></a>
                        <a name="GitHub" href="https://github.com/quijotex" target="_blank" rel="noreferrer"><img src={GitHub} alt="GitHub"/></a>
                    </div>
                    <div className="developer-Helson">
                        <h2>Helson Manchego</h2>
                        <a name="LinkedIn" href="https://www.linkedin.com/in/helson-manchego-b5782836/" target="_blank" rel="noreferrer"><img src={LinkedIn} alt="LinkedIn"/></a>
                        <a name="GitHub"  href="https://github.com/helsontm" target="_blank" rel="noreferrer"><img src={GitHub} alt="GitHub"/></a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default FooterLayout
