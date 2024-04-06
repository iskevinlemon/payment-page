import { useEffect, useState } from "react";
import { PaymentDetails } from "../interfaces";
import { countryList } from "./countries";
import CardItem from "./CartItem";
import {CheckOutDetails} from "../interfaces";

const Checkout:React.FC<CheckOutDetails> = ({paymentDetails}) => {

    const [country, setCountry] = useState<string>("Choose a country");
    const [expiry, setExpiry] = useState<string>("");
    const [payButtonLoading, setPayButtonLoading] = useState<boolean>(false);
    const [totalPayment, setTotalPayment] = useState<number>(0);

    function formatCardExpiry(str: string): string{
        if(str.length === 4 && /^\d+$/.test(str)){
            const formattedExpiry = `${str.substring(0, 2)}/${str.substring(2, 4)}`;
            setExpiry(formattedExpiry);
            return formattedExpiry;
        } 
        else{
            return str;
        }
    }
    
    function processPayment(): void{
        setPayButtonLoading(true);
    }

    function sumTotalPayment(items: PaymentDetails['item']): void {
        const total = items.reduce((acc, item) => acc + item.pricePerUnit, 0);
        setTotalPayment(total);
    }
    
    useEffect(() => {
        sumTotalPayment(paymentDetails.item);
    }, [paymentDetails.item]);

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

                                <div className="dropdown float-start">
                                    <button data-bs-toggle="dropdown" className="btn-test-mode-info">
                                        <i className="text-dark fas fa-circle-info me-2"></i>
                                    </button>
                                    <ul className="dropdown-menu p-3" style={{
                                            fontSize: "0.85rem", 
                                            border:"none",
                                            boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px"
                                        }}>
                                        <li>
                                            This is a test page, any details entered <br />
                                            will be voided and no payment will be <br />
                                            processed
                                        </li>
                                    </ul>
                                </div>

                            </span>
                        }
                    </h5>

                    {paymentDetails.item.map((item, index) => (
                    <CardItem 
                        key={index} 
                        itemDetails={item} />
                    ))}
                    
                    <div className="card total-card">
                        <div className="card-body">
                            <span className="float-end">
                                ${totalPayment}
                            </span>
                            <b>Total payment</b>
                        </div>
                    </div>

                </div>

                <div className="col-md-6 payment-area pa-payment-details col-pa">

                    <h6 className="font-weight-bold mb-3">
                        <b>Shipping information</b>
                    </h6>

                    <label htmlFor="email" className="field-label">Email</label>
                    <input type="text" name="email" className="form-control form-control-lg mb-3" />

                    <label htmlFor="shippingAddress" className="field-label">Shipping address</label>
                    <input type="text" name="shippingName" className="form-control form-control-lg fc-shipping-name" 
                        placeholder="Name"
                    />
                    <select name="shippingCountry" 
                        onChange={(e) => setCountry(e.target.value)}
                        className={`form-control form-control-lg fc-country ${country == "Choose a country" ? "text-border" :""}`}
                    >
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

                    <ul className="nav nav-tabs px-1 py-1">
                        <li className="nav-item me-2">
                            <a className="nav-link active px-4" data-bs-toggle="tab" href="#card_payment">
                                <i className="far fa-credit-card me-2"></i>
                                Card
                            </a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link px-4" data-bs-toggle="tab" href="#cash_payment">
                                <i className="far fa-money-bill-1 me-2"></i>
                                Cash
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content mt-2">
                        <div className="tab-pane active" id="card_payment">
                            <label htmlFor="cardInformation" className="field-label">Card information</label>
                            <div className="input-group input-group-lg">
                                <input type="number" name="cardNumber" className="form-control fc-card-info" 
                                    placeholder="1234 1234 1234 1234"/>
                                <span className="input-group-text bg-white fcc-vma">
                                    <img src="/imgs/vma.png" width={100} alt="" />
                                </span>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" name="monthYearExpiry" className="form-control form-control-lg fc-mm-yy"
                                    placeholder="MM/YY"
                                    maxLength={4}
                                    value={expiry}
                                    onChange={(e) =>{
                                        const formattedExpiry = formatCardExpiry(e.target.value);
                                        setExpiry(formattedExpiry);
                                    }}
                                />
                                <input type="number" name="cvc" className="form-control form-control-lg fc-cvc" 
                                    placeholder="CVC"
                                />
                            </div>

                            <label htmlFor="nameOnCard" className="field-label">Name on card</label>
                            <input type="text" name="nameOnCard" className="form-control form-control-lg mb-3" />
                        </div>

                        <div className="tab-pane fade" id="cash_payment">
                            <label htmlFor="paymentReference" className="field-label">Payment reference</label>
                            <div><small className="text-secondary">This number will be provided by your merchant</small></div>
                            <input type="text" name="paymentReference" className="form-control form-control-lg mb-3" 
                                placeholder="E.g. 1234567abc"
                            />
                        </div>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" 
                                name="billingAddressIsShippingAddress" 
                                value="billingAddressIsShippingAddress"
                                defaultChecked
                                disabled
                                />
                            Billing address is same as shipping
                            <div>
                                <small className="text-secondary">
                                    This cannot be changed
                                </small>
                            </div>
                        </label>
                    </div>

                    <div className="d-grid mb-3 mt-3" 
                        onClick={processPayment}
                    >
                        <button className="btn bg-dark btn-block pay-btn"
                            disabled={payButtonLoading}
                        >
                            {payButtonLoading ? (
                                <>
                                    <div className="text-white spinner-border spinner-border-sm me-2"></div>
                                    <small className="text-white">Processing</small>
                                </>
                            ):(
                                <>Pay {paymentDetails.currencyCode}$ {paymentDetails.amount}</>
                            )}
                            
                        </button>
                    </div>

                </div>

            </div>
        </>
    );
}
 
export default Checkout;