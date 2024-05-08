const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const redisClient = require("../utils/intredis");
const { DeveloperRoutes } = require("./developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");

// (async () => {
//   await redisClient.set("key", "value");
//   const value = await redisClient.get("key");
//   console.log(value);
// })();
const router = require("express").Router();

router.use("/user", UserAuthRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/admin", AdminRoutes);
router.use("/", HomeRoutes);

module.exports = {
  AllRoutes: router,
};
