import { Typography } from "@mui/material"
import { CSSProperties, useState } from "react";
import { Link } from "react-router"

const Navbar = () => {
    const buttonStyle: CSSProperties = {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const hoverStyle: CSSProperties = {
        backgroundColor: '#0056b3',
    }
    const [isHoveredHome, setIsHoveredHome] = useState(false);
    const [isHoveredAbout, setIsHoveredAboute] = useState(false);
    const [isHoveredRecipes, setIsHoveredRecipes] = useState(false);

    return (<>
        <nav>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
                <Link style={{ ...buttonStyle, ...(isHoveredHome ? hoverStyle : {}) }}
                    onMouseEnter={() => setIsHoveredHome(true)}
                    onMouseLeave={() => setIsHoveredHome(false)}
                    to='/'>Home
                </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Link style={{ ...buttonStyle, ...(isHoveredAbout ? hoverStyle : {}) }}
                    onMouseEnter={() => setIsHoveredAboute(true)}
                    onMouseLeave={() => setIsHoveredAboute(false)}
                     to='/about'>About
                </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Link style={{ ...buttonStyle, ...(isHoveredRecipes ? hoverStyle : {}) }}
                    onMouseEnter={() => setIsHoveredRecipes(true)}
                    onMouseLeave={() => setIsHoveredRecipes(false)} 
                    to='/recipes'>Recipes
                </Link>
            </Typography>
        </nav>
    </>)
}
export default Navbar