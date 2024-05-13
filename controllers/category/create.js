const Categorys = require('../../models/Category');

async function create(params) {
    const { category,ref_id } = params;

        const newcategory = new Categorys({
            category:category,
            ref_id:ref_id
        });

        const responce = await newcategory.save();
        return responce;
   
}

module.exports = create;







// const create = async (req, res) => {
//     try {
//         const data = req.body;
//         const newcategory = new categorys(data);
//         const responce = await newcategory.save();
//         console.log("data saved");

//         return res.status(200).json({ message: "category insert successfully" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

