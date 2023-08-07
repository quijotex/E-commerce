import { Outlet } from "react-router-dom"

const FooterLayout = () => {
    return(
        <div className="layout">
                <Outlet/>
            <footer className="footer">
                <h1>Academlo</h1>
            </footer>
        </div>
    )
}
export default FooterLayout
