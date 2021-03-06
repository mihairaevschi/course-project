import { useContext } from 'react';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);
    return (
        <div className='product-card-container'>
            <img alt={`${name}`} src={imageUrl}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={() => addItemToCart(product)} buttonType='inverted'>Add  to card</Button>
        </div>
    )
}

export default ProductCard;