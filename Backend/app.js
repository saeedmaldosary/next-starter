const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

// Generate array of allowed origins
const getAllowedOrigins = () => {
  const origins = [];
  for (let port = 3000; port <= 3010; port++) {
    origins.push(`http://localhost:${port}`);
  }
  return origins;
};

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let products = [];
let currentId = 1;

const STATUS_OPTIONS = [
  { id: 0, name: "available" },
  { id: 1, name: "not available" }
];

const paginateResults = (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size) || 10;

  const startIndex = page * size;
  const endIndex = startIndex + size;

  const paginatedResponse = {
    content: products.slice(startIndex, endIndex),
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: startIndex,
      pageSize: size,
      pageNumber: page,
      paged: true,
      unpaged: false
    },
    last: endIndex >= products.length,
    totalElements: products.length,
    totalPages: Math.ceil(products.length / size),
    size: size,
    number: page,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    first: page === 0,
    numberOfElements: Math.min(size, products.length - startIndex),
    empty: products.length === 0
  };

  res.paginatedResults = paginatedResponse;
  next();
};

app.get("/api/status", (req, res) => {
  res.json(STATUS_OPTIONS);
});

app.post("/api/products", (req, res) => {
  const { title, description, price, features, status } = req.body;

  const validStatus = STATUS_OPTIONS.find((s) => s.id === status);
  if (!validStatus) {
    return res.status(400).json({ error: "Invalid status id" });
  }

  const product = {
    id: currentId++,
    title,
    description,
    price,
    features,
    status: validStatus.name
  };

  products.push(product);
  res.status(201).json(product);
});

app.get("/api/products", paginateResults, (req, res) => {
  res.json(res.paginatedResults);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

app.put("/api/products/:id", (req, res) => {
  const { title, description, price, features, status } = req.body;
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (status !== undefined) {
    const validStatus = STATUS_OPTIONS.find((s) => s.id === status);
    if (!validStatus) {
      return res.status(400).json({ error: "Invalid status id" });
    }
    products[productIndex].status = validStatus.name;
  }

  products[productIndex] = {
    ...products[productIndex],
    ...(title && { title }),
    ...(description && { description }),
    ...(price && { price }),
    ...(features && { features })
  };

  res.json(products[productIndex]);
});

app.delete("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
