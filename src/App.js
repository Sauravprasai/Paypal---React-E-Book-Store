import "./App.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from "./Product";
import { productData, responsive } from "./data";

function App() {
  const product = productData.map((item) =>(
    <Product name={item.name} url={item.imageurl} desc={item.desc} price={item.price}/>
  ))


  return (
    <div className="App">
    
    <h1>E-Book Online Store</h1>
      <Carousel responsive={responsive}>
        {product }
      </Carousel>;
    </div>
  );
}

export default App;
