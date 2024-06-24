const express = require("express");
const app = express();
const connectDb = require("./config/db");
const authRoute = require("./routes/authRoute");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const orderRoute = require("./routes/orderRoute");

const cors = require("cors");

connectDb();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/", (req, res) => {
  url = req.body.url;
  res.send(`Proxy URL set to: ${url}`);

  if (url.includes("DESKTOP_WEB_LISTING")) {
    app.use(
      "/fetchRestro",
      createProxyMiddleware({
        target: url,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.removeHeader("origin");
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log("Original request URL:", req.originalUrl);
          console.log("Proxied request URL:", proxyRes.req.path);
          if (proxyRes.headers.location) {
            console.log("Redirected URL:", proxyRes.headers.location);
          }
        },
        onError: (err, req, res) => {
          console.error("Proxy error:", err);
          res.status(500).send("Proxy error occurred.");
        },
      })
    );
  } else if (url.includes("tags")) {
    app.use(
      "/fetchFilteredRestro",
      createProxyMiddleware({
        target: url,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.removeHeader("origin");
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log("Original request URL:", req.originalUrl);
          console.log("Proxied request URL:", proxyRes.req.path);
          if (proxyRes.headers.location) {
            console.log("Redirected URL:", proxyRes.headers.location);
          }
        },
        onError: (err, req, res) => {
          console.error("Proxy error:", err);
          res.status(500).send("Proxy error occurred.");
        },
      })
    );
  } else {
    app.use(
      "/fetchMenu",
      createProxyMiddleware({
        target: url,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.removeHeader("origin");
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log("Original request URL:", req.originalUrl);
          console.log("Proxied request URL:", proxyRes.req.path);
          if (proxyRes.headers.location) {
            console.log("Redirected URL:", proxyRes.headers.location);
          }
        },
        onError: (err, req, res) => {
          console.error("Proxy error:", err);
          res.status(500).send("Proxy error occurred.");
        },
      })
    );
  }
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.use("/api/users", authRoute);
app.use("/api/orders", orderRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
