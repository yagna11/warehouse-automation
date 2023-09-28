const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = process.env.PORT || 3000;

const orders = JSON.parse(fs.readFileSync("../script/orders.json", "utf8"));
const products = JSON.parse(
  fs.readFileSync("../script/productsMap.json", "utf8")
);

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  switch (parsedUrl.pathname) {
    case "/get-picking-list":
      const pickingList = await getPickingList();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(pickingList));
      break;

    case "/get-packing-list":
      const packingList = await getPackingList();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(packingList));
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
  }
});

const getPickingList = async () => {
  let itemsCounter = {};

  const today = new Date();
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 1);
  const formattedPrevDay = `${previousDay.getFullYear()}-${String(
    previousDay.getMonth() + 1
  ).padStart(2, "0")}-${String(previousDay.getDate()).padStart(2, "0")}`;

  const previousDayOrders = orders.filter(
    (order) => order.orderDate === formattedPrevDay
  );

  previousDayOrders.forEach((order) => {
    order.lineItems.forEach((lineItem) => {
      if (products[lineItem.productId]) {
        products[lineItem.productId].items.forEach((product) => {
          itemsCounter[product] = itemsCounter[product]
            ? itemsCounter[product] + 1
            : 1;
        });
      };
    });
  });

  return itemsCounter;
};

const getPackingList = async () => {
  let packingList = [];

  const today = new Date();
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 1);
  const formattedPrevDay = `${previousDay.getFullYear()}-${String(
    previousDay.getMonth() + 1
  ).padStart(2, "0")}-${String(previousDay.getDate()).padStart(2, "0")}`;

  const previousDayOrders = orders.filter(
    (order) => order.orderDate === formattedPrevDay
  );

  previousDayOrders.forEach((order) => {
    const orderDetails = {
      orderId: order.orderId,
      orderDate: order.orderDate,
      customerName: order.customerName,
      shippingAddress: order.shippingAddress,
      lineItems: [],
    };

    order.lineItems.forEach((lineItem) => {
      if (products[lineItem.productId]) {
        const packingListItems = {
          productName: lineItem.productName,
          items: products[lineItem.productId].items,
        };

        orderDetails.lineItems.push(packingListItems);
      };
    });

    packingList.push(orderDetails);

  });

  return packingList;
};

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
