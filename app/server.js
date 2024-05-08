const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./routes/router");
const createErrors = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");

//swager config
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    // autoBind(this);
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.connectToMongoDB();
    this.creatServer();
    this.initRedis();
    this.creatRoutes();
    this.errorHandling();
  }
  //app config
  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(cors());
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJSDoc({
          swaggerDefinition: {
            info: {
              title: "Shopping website back-end",
              version: "1.0.0",
              description: "بزرگترین مرجع فروش محصولات آموزشی",
              contact: {
                name: "Ali Yousefi",
                email: "hielementor@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:4000",
              },
            ],
          },
          apis: ["./app/routes/**/*.js"],
        })
      )
    );
  }

  //create server
  creatServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }

  //mongoDB connect
  connectToMongoDB() {
    try {
      mongoose.connect(this.#DB_URI);
      mongoose.connection.on("connected", () => {
        console.log("mongoose connected to DB");
      });
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //connected ro Redis
  initRedis() {
    require("./utils/intredis");
  }

  //create routes
  creatRoutes() {
    this.#app.use(AllRoutes);
  }

  //error handeling
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createErrors.NotFound("آدرس مورد نظر یافت نشد!"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createErrors.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
