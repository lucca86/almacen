import axios from "axios";
import Papa from 'papaparse';

import { Product } from "./types"

export default {
    list: async (): Promise<Product[]> => {
        return axios
            .get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vRAm_hT6D95Mmho-ldLojuKJ-2aQuX4Y0fPGOjSZoffSn1YUl7vREFTuRBCEZDJ54IM1NLeTVKTtMC8/pub?gid=0&single=true&output=csv`, {
                responseType: 'blob'
            })
            .then((response) => {
                //console.log(response);
                
                return new Promise<Product[]>((resolve, reject) => {
                    Papa.parse(response.data, {
                        header: true,
                        complete: (results) => {
                            const products = results.data as Product[]
                            return resolve(
                                products.map((product) => ({
                                ...product,
                                price: Number(product.price),
                            })));
                            
                        },
                        error: (error) => {
                            return reject(error.message)
                        }
                    })
                })
                
            })
    }
};