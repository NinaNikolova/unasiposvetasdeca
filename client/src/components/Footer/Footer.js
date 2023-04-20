import './Footer.module.css'
import { Link } from 'react-router-dom';
export const Footer = () => {
    return (
        <footer id="site-footer" >
               <p style={{ fontSize: "0.4rem" }}>2023 &copy; Copyright-У нас и по света с деца. Проектът е защита нa изпит по ReactJS към<Link to="https://softuni.bg/" target="_blank" style={{ color: 'green' }}> СофтУни</Link></p>   
        </footer>
    )
}