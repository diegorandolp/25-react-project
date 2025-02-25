import {useState, useEffect} from "react";

const API_URL = import.meta.env.VITE_PLATZI_URL;

export default function LoadMoreProducts({maxProductsPerRow = 4}) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [arrayRows, setArrayRows] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal

        async function getProducts(){
            try {
                setLoading(true);
                const apiUrlPagination = `${API_URL}?offset=0&limit=20`;
                const response = await fetch(apiUrlPagination, {signal});
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setArrayRows(Array.from(Array(result.length / maxProductsPerRow), (_, i) => i*4));
                setProducts(result);
            } catch (error){
                if (error.name !== 'AbortError') {
                    console.log('Fetch aborted');
                }
            } finally {
                setLoading(false);
            }
        }
        getProducts()

        return () => {
            controller.abort();
        }
    }, []);



    return (
        <div className="load-more-products">
            {arrayRows.map((item, key) => (

                <div className="flex">
                    {products.slice(item, item + maxProductsPerRow).map((product, key) => (
                        <div className="product-card" key={key}>
                            <p>{product.title}</p>
                        </div>
                    ))}
                </div>
            ))}

        </div>
    )
}