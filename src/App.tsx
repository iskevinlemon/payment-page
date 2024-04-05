import Checkout from "./components/Checkout";

interface PaymentDetails{
  isTestMode: boolean;
  merchantName: string;
  itemName: string;
  itemQuantity: number,
  currencyCode: string;
  amount: number;
}

function App() {

  const paymentDetails: PaymentDetails = {
    isTestMode: true,
    merchantName: "Donut Shop",
    itemName: "Strawberry doughnut",
    itemQuantity: 1,
    currencyCode: "SG",
    amount: 2.75
  }

  return (
    <>
      <Checkout paymentDetails={paymentDetails}/>
    </>
  )
}

export default App;
