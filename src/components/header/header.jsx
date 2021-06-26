import './header.scss';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        

        <header>
            <h1>RESTy</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/help">Help</Link></li>
            </ul>
        </header>

    );
};

export default Header;