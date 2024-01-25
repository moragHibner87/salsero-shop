import CustomersBox from "../components/Home/CustomersBox";
import ProductsBox from "../components/Home/ProductsBox";
import PurchasesBox from "../components/Home/PurchasesBox";
import { useSelector } from "react-redux";


export default function Home() {
    const purchases = useSelector((state) => state.purchases.purchases);
    const products = useSelector((state) => state.products.products)

    const totalPurchases = purchases.reduce((total, order) => {
        const product = products.find((product) => product.id === order.ProductID)
        if(product){
            total += +product.price
        }
        return total
    }, 0)

  return (
    <div>
        <h1 className="font-nunito text-3xl md:text-5xl !leading-[1.2] font-semibold mb-3">Welcome to <span className="text-yellow-500">Salsero Shop</span></h1>
        <div className="text-xl mb-8">Manage your store easy, fast and simple</div>
        <div className="bg-orange-200/50 p-5 rounded-md text-2xl md:text-3xl">Total store revenue: <span className="text-yellow-500 font-bold"><span className="currency">$</span>{totalPurchases.toLocaleString()}</span></div>
        <div className="grid xl:grid-cols-3 gap-8 py-8">
            <ProductsBox/>
            <CustomersBox/>
            <PurchasesBox/>
        </div>
    </div>
  )
}
