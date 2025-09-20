const Product = require("../model/product");
const path = require("path");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const image = req.file ? req.file.filename : "";

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "فشل في إنشاء المنتج", error });
  }
};
exports.bestSelling = async (req, res) => {
  try {
    const products = await Product.find().sort({ salesCount: -1 }).limit(6);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب المنتجات", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
    res.json({ message: "تم حذف المنتج بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedData = { name, price, category, description };
    if (image) updatedData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء التعديل", error });
  }
};
exports.searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { category: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(keyword).limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

exports.categories = async(req,res) => {
    try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الأقسام" });
  }
}
exports.category = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب المنتجات الخاصة بالقسم" });
  }
};
