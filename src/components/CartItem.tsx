import { ItemDetails } from "../App";

interface CardItemProps{
  itemDetails: ItemDetails;
}

const CardItem: React.FC<CardItemProps> = ({itemDetails}) => {
    return (
        <div className="card item-card">
            <div className="card-body">
                <span className="float-end">
                    {itemDetails.pricePerUnit}
                </span>
                <b>{itemDetails.name}</b>
                <div>
                    <small className="text-secondary">
                        Quantity: {itemDetails.quantity}
                    </small>
                </div>
            </div>
        </div>
    );
}
 
export default CardItem;