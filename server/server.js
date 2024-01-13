require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userDataRoutes = require("./routes/userDataRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const basicAuth = require("express-basic-auth");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("./models/userModel");
const Comments = require("./models/comments");

AdminBro.registerAdapter(AdminBroMongoose);

const app = express();

const port = process.env.PORT || 5000;

// ADDING ENVIRENMENT VARIABLES
mongodbLink = process.env.MONGODB_LINK;
clientLink = process.env.CLIENT_LINK;

console.log(mongodbLink)
//Middlewares

app.use(
  cors({
    origin: [clientLink],
    methods: ["GET", "POST", "UPDATE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// log in development environment

const morgan = require("morgan");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${port}!`);
  }
});

app.use(
  session({
    secret: "your_secret_key", // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect(mongodbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Succesfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const AdminBroOptions = {
  resources: [User, Comments],
  branding: {
    companyName: "YearBook Portal Administration",
  },
};
const adminBro = new AdminBro(AdminBroOptions);
const adminRouter = AdminBroExpress.buildRouter(adminBro);
const adminAuth = basicAuth({
  users: { [process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD },
  challenge: true, // Sends authentication headers on a failed login attempt
  unauthorizedResponse: "Authentication required!", // Response on unauthorized access
});

const noStore = (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
};
app.use(adminBro.options.rootPath, noStore, adminAuth, adminRouter);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(userDataRoutes);

// page not found error handling  middleware

app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: "API Endpoint does not found",
  };
  next(error);
});

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});
