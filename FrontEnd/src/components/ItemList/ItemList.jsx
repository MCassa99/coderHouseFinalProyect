import BlankCard from "../BlankCard/BlankCard";
import Item from "../Item/Item";

const ItemList = ({product, id}) => {
    return (
        <div className='row p-4'>
            { id ? 
            <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                <BlankCard />
            </div>
            : null }
            {product.map((destino) => 
                <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={destino._id}>
                    <Item destino={destino} />
                </div>
                )}
        </div>
    )
}

export default ItemList;