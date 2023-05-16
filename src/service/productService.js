import axios from "axios";


export const findAll = async ({page, name}) => {
    try {
        const book = await axios.get(
            `http://localhost:8080/products?page=${page ? page : 0}&name=${name}`
        );
        return book.data;
    } catch (error) {
        console.log(error);
    }
};
export const findAllType = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/productTypes`);
        return result.data
    } catch (err) {
        console.log(err)
    }
}
export const findProductById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/products/${id}`);
        return result.data
    } catch (err) {
        console.log(err)
    }
}
export const editProduct = async (product) => {
    try {
        await axios.put(`http://localhost:8080/products`, {...product});
    } catch (err) {
        console.log(err)
    }
}
export const createProduct = async (product) => {
    try {
        await axios.post(`http://localhost:8080/products`, {...product})
    } catch (err) {
        console.log(err)
    }
}
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/products/${id}`)
    } catch (err) {
        console.log(err)
    }
}