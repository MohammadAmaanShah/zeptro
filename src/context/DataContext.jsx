import axios from "axios";
import { createContext, useContext } from "react";
import { useState } from "react";

export const DataContext = createContext(null);


export const DataProvider = ({ children }) => {
    const [data, setData] = useState()
    const fetchAllProducts = async () => {

        try {
            const res = await axios.get(`https://dummyjson.com/products`)
            console.log(res)

            const productData = res.data.products;
            setData(productData);
            console.log(productData)

            // console.log(productData)
        } catch (error) {
            console.log(error + ' the is  an error ');

        }
    }
    const getUniqueCatagory = (data, proprety) => {
        let newVal = data?.map((curElem) => {
            return curElem[proprety]
        })
        newVal = ['All', ...new Set(newVal)];
        return newVal;
    }





    const catagoryOnlyData = getUniqueCatagory(data, 'category');
    const brandOnlyData = getUniqueCatagory(data, 'brand')
    return <DataContext value={{ data, setData, fetchAllProducts, catagoryOnlyData, brandOnlyData }}>
        {children}
    </DataContext>

}

export const getData = () => useContext(DataContext);

