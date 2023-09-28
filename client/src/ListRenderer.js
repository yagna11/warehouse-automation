import React, { useState } from "react";
import axios from "axios";

const ListRenderer = () => {
  const [pickingList, setPickingList] = useState({});
  const [packingList, setPackingList] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}`, error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => fetchData("/get-picking-list", setPickingList)}
          style={{ ...styles.button, ...styles.rightMargin }}
        >
          Get Picking List
        </button>
        <button
          onClick={() => fetchData("/get-packing-list", setPackingList)}
          style={styles.button}
        >
          Get Packing List
        </button>
      </div>

      <section>
        <h2 style={styles.sectionHeader}>Picking List</h2>
        <div>
          {Object.entries(pickingList).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2 style={styles.sectionHeader}>Packing List</h2>

        {packingList.map((order) => (
          <div key={order.orderId} style={styles.orderContainer}>
            <strong>Order ID:</strong> {order.orderId}
            <div>
              <strong>Customer:</strong> {order.customerName}
            </div>
            <>
              {order.lineItems.map((item) => (
                <div key={item.productName}>
                  <strong>{item.productName}</strong>: {item.items.join(", ")}
                </div>
              ))}
            </>
          </div>
        ))}
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  buttonContainer: {
    marginBottom: "20px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  rightMargin: {
    marginRight: "10px",
  },
  sectionHeader: {
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
  },
  preStyle: {
    background: "#f7f7f7",
    padding: "10px",
    borderRadius: "5px",
  },
  orderContainer: {
    marginBottom: "15px",
  },
};

export default ListRenderer;
