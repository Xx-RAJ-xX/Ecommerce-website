const express = require("express");
const { route } = require("express/lib/router");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticatedUser , authorizeRoles("admin"), getAllProducts);
router.route("/products/new").post(isAuthenticatedUser ,createProduct);
router.route("/product/:id").put(isAuthenticatedUser ,updateProduct).delete(isAuthenticatedUser ,deleteProduct).get(getProductDetails);

module.exports = router;