import { Nav } from 'react-bootstrap';

const Button = ({ href, name }) => {
    return (
        <Nav.Link className='navbutton' href={href}>{name}</Nav.Link>
    );
};

export default Button;