import Checkout from "./components/Checkout";
import { ItemDetails, PaymentDetails } from "./interfaces";

function App() {

  const dummyData: ItemDetails[] = [
    {
      name: "Strawbery Donut",
      quantity: 1,
      pricePerUnit: 2.75,
    },
    {
      name: "Chocolate Donut",
      quantity: 1,
      pricePerUnit: 2.55,
    },
    {
      name: "Hot tea",
      quantity: 1,
      pricePerUnit: 3.75,
    }
  ];

  const paymentDetails: PaymentDetails = {
    isTestMode: true,
    merchantName: "Donut Shop",
    item: dummyData,
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
