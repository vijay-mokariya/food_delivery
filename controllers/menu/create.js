const Menu = require('../../models/Menu');


async function create(params) {
    const { menu_name,description,price,category_id } = params;

        const newMenu = new Menu({
            menu_name:menu_name,
            description:description,
            price:price,
            category_id:category_id
        });

        const responce = await newMenu.save();
        return responce;
   
   
}

// const create = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const newMenu = new menu(data);

//         const responce = await newMenu.save();
//         console.log("data saved");

//         // return res.status(200).json(responce);
//         return res.status(200).json({ message: "menu insert successfully" });


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

module.exports = create;