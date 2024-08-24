import express from "express"
import {isAdmin ,requireSignIn} from "../Middleware/authMiddleware.js"
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productListController, productPhotoController, updateProductController } from "../controller/productController.js";
import formidable from "express-formidable"

const router=express.Router();

// routes
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)

router.get("/get-product",getProductController)

router.get("/get-product/:slug",getSingleProductController)

router.get("/product-photo/:pid",productPhotoController)

router.delete("/product/:pid",deleteProductController)

router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)

router.get("/product-count",productCountController)

router.get("/product-list/:page",productListController)

router.get("/product-category/:slug",productCategoryController)
export default router