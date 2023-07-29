import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Product(props) {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    // Function to trigger file download
    const downloadFile = () => {
      const downloadLink = document.createElement("a");
      downloadLink.href = `/books/${props.name}.epub`;
      downloadLink.download = `${props.name}.epub`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Mark the file as downloaded
      setDownloaded(true);
    };

    // Check if the transaction is completed, and if it is, trigger the file download
    if (downloaded) {
      downloadFile();
    }
  }, [downloaded, props.name]);

  return (
    <div className='card'>
      <img src={props.url} alt='Product Image' className="product--image" />
      <h2>{props.name}</h2>
      <p className='price'>$ {props.price}</p>
      <p className="description"> {props.desc}</p>
      <p>
        <PayPalScriptProvider
          options={{ "client-id": "ASd9mVmhzF-GQt82tr7NatGMO1-hSfNApQD9ocZZvnGAZufZZ9E3FlOsanBH6uiFPnWyzT-j2Q-IJMeX" }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: props.price,
                      currency: "USD"
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
                // Mark the file as downloaded to trigger useEffect
                setDownloaded(true);
              });
            }}
          />
        </PayPalScriptProvider>
      </p>
    </div>
  );
}
