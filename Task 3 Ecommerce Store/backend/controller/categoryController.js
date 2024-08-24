import categoryModel from "../modal/categoryModel.js"
import slugify from "slugify"


export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        // Validation
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }

        // Check if the category already exists
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category already exists',
            });
        }

        // Create new category with slug
        const category = new categoryModel({ name, slug: slugify(name) });
        await category.save();

        res.status(201).send({
            success: true,
            message: 'New category created',
            category,
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send({
            success: false,
            message: 'Error creating category',
            error: error.message,
        });
    }
};



export const updateCategoryController =async(req,res)=>{

    try{
        const {name}= req.body 
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new :true})
        res.status(200).send({
            success:true,
            message:'Category updated successfully',
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }

}

export const categoryController =async(req,res)=>{
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Categories list",
            category,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error while getting all'
        })

    }
}

export const singleCategoryController =async(req,res) =>{
    try{
        
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"get single category",
            category


        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while getting single category"
        })

    }
}

export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };