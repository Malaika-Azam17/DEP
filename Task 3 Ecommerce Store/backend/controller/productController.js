import productModal from "../modal/productModal.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../modal/categoryModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files; 

    // validation
    switch (true) {
        case !name:
            return res.status(500).send({
                error: "Name is required"
            });
        case !description:
            return res.status(500).send({
                error: "Description is required"
            });
        case !price:
            return res.status(500).send({
                error: "Price is required"
            });
        case !category:
            return res.status(500).send({
                error: "Category is required"
            });
        case !quantity:
            return res.status(500).send({
                error: "Quantity is required"
            });
        case photo && photo.size > 1000000:
            return res.status(500).send({
                error: "Photo is required and should be less than 1MB"
            });
    }

    // Create and save product
    const product = new productModal({ ...req.fields, slug: slugify(name) });
    if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
        success: true,
        message: "Product created successfully",
        product,
    });

} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in creating product",
        error: error.message,
    });
}
};

//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModal
          .find({})
          .populate("category")
          .select("-photo")
          .limit(12)
          .sort({ createdAt: -1 });
        res.status(200).send({
          success: true,
          counTotal: products.length,
          message: "ALL Products ",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr in fetching products",
          error: error.message,
        });
      }
    
};
// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModal
          .findOne({ slug: req.params.slug })
          .select("-photo")
          .populate("category");
        res.status(200).send({
          success: true,
          message: "Single Product Fetched",
          product,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Eror while fetching single product",
          error,
        });
      }
    
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModal.findById(req.params.pid).select("photo");
        if (product.photo.data) {
          res.set("Content-type", product.photo.contentType);
          return res.status(200).send(product.photo.data);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr while getting photo",
          error,
        });
      }
    
};

//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await productModal.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
          success: true,
          message: "Product Deleted successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while deleting product",
          error,
        });
      }
    
};

//upate product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
          req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = await productModal.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
          );
          if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
          }
          await products.save();
          res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
          });
        }
      
};


// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModal.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }


};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModal
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }

};


// get product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModal.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }

};