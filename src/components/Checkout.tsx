import { countryList } from "./countries";

interface CheckoutProps{
  paymentDetails:{
    isTestMode: boolean;
    merchantName: string;
    itemName: string;
    itemQuantity: number,
    currencyCode: string;
    amount: number;
  };
}

const Checkout:React.FC<CheckoutProps> = ({paymentDetails}) => {
    return (
        <>
            <div className="row vh-100">

                <div className="col-md-6 payment-area">
                    <h5 className="mb-3">
                        <i className="merchant-icon text-secondary fas fa-shop me-2"></i>
                        {paymentDetails.merchantName}

                        {paymentDetails.isTestMode &&
                            <span className="ms-2 badge bg-warning text-dark px-2">
                                Test mode
                            </span>
                        }
                    </h5>
                    
                    <div className="card item-card">
                        <div className="card-body">
                            <span className="float-end">
                                {paymentDetails.currencyCode}${paymentDetails.amount}
                            </span>
                            <b>{paymentDetails.itemName}</b>
                            <div>
                                <small className="text-secondary">
                                    Quantity: {paymentDetails.itemQuantity}
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="card total-card">
                        <div className="card-body">
                            <span className="float-end">
                                {paymentDetails.currencyCode}${paymentDetails.amount}
                            </span>
                            <b>Total payment</b>
                        </div>
                    </div>

                </div>

                <div className="col-md-6 payment-area pa-payment-details col-pa">

                    {/* <div className="d-grid mb-3">
                        <button className="btn bg-dark btn-block apple-pay-btn">
                            <i className="fab fa-apple me-1"></i>
                            Pay
                        </button>
                    </div> */}

                    <h6 className="font-weight-bold mb-3">
                        <b>Shipping information</b>
                    </h6>

                    <label htmlFor="email" className="field-label">Email</label>
                    <input type="text" name="email" className="form-control form-control-lg mb-3" />

                    <label htmlFor="shippingAddress" className="field-label">Shipping address</label>
                    <input type="text" name="shippingName" className="form-control form-control-lg fc-shipping-name" 
                        placeholder="Name"
                    />
                    <select name="shippingCountry" className="form-control form-control-lg fc-country">
                        {
                            countryList.map((country) => (
                                <option
                                    key={country}
                                    value={country}
                                >
                                    {country}
                                </option>
                            ))
                        }
                    </select>
                    <input type="text" name="shippingAddress" className="form-control form-control-lg fc-address mb-3" 
                        placeholder="Address"
                    />

                    <h6 className="font-weight-bold mb-3">
                        <b>Payment details</b>
                    </h6>

                    <label htmlFor="cardInformation" className="field-label">Card information</label>
                    <div className="input-group input-group-lg">
                        <input type="text" name="cardNumber" className="form-control fc-card-info" 
                            placeholder="1234 1234 1234 1234"/>
                        <span className="input-group-text bg-white fcc-vma">
                            <img src="/imgs/vma.png" width={100} alt="" />
                        </span>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="monthYearExpiry" className="form-control form-control-lg fc-mm-yy"
                            placeholder="MM/YY"/>
                        <input type="number" name="cvc" className="form-control form-control-lg fc-cvc" 
                            placeholder="CVC"/>
                    </div>

                    <label htmlFor="nameOnCard" className="field-label">Name on card</label>
                    <input type="text" name="nameOnCard" className="form-control form-control-lg mb-3" />

                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" 
                                name="billingAddressIsShippingAddress" 
                                value="billingAddressIsShippingAddress"
                                checked
                                />
                            Billing address is same as shipping
                            <div>
                                <small className="text-secondary">
                                    This cannot be changed
                                </small>
                            </div>
                        </label>
                    </div>

                    <div className="d-grid mb-3 mt-3">
                        <button className="btn bg-dark btn-block apple-pay-btn">
                            Pay {paymentDetails.currencyCode}$ {paymentDetails.amount}
                        </button>
                    </div>

                </div>

            </div>
        </>
    );
}
 
export default Checkout;