import Item from "../Item/Item";

const ItemList = ({product}) => {
    return (
        <div className='row p-4'>
            {product.map((destino) => 
                <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={destino.id}>
                    <Item destino={destino} />
                </div>
                )}
        </div>
    )
}

export default ItemList;