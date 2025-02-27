import {useState, useEffect} from "react";

const API_URL = import.meta.env.VITE_PLATZI_URL;

export default function LoadMoreProducts({maxProductsPerRow = 4}) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [arrayRows, setArrayRows] = useState([]);
    const [limit, setLimit] = useState(20);


    async function getProducts(limit_, signal_){
        try {
            setLoading(true);
            const apiUrlPagination = `${API_URL}?offset=0&limit=${limit_}`;
            const response = await fetch(apiUrlPagination, {signal_});
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setArrayRows(Array.from(Array(Math.floor(result.length / maxProductsPerRow)), (_, i) => i*4));
            setProducts(result);
        } catch (error){
            if (error.name !== 'AbortError') {
                console.log('Fetch error:', error.message);
                console.log('Fetch aborted');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;
        getProducts(limit,signal);

        return () => {
            controller.abort();
        }
    }, []);

    function handleLoadMore(){
        if (limit < 100) {
            setLimit((limit) => {
                let newLimit = limit + 20;

                const controller = new AbortController();
                const signal = controller.signal;
                getProducts(newLimit,signal);

                return limit + 20
            });

        }
    }

    return (
        <div className="load-more-products">
            {arrayRows.map((item, key) => (

                <div className="flex">
                    {products.slice(item, item + maxProductsPerRow).map((product, key) => (
                        <div className="product-card" key={key}>
                            <img src={product.images[0]} alt={product.title}/>
                            <div className="info-product-card">
                                <h2>{product.title}</h2>
                                <p className="text-gray-500">Price</p>
                                <p>{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={() => handleLoadMore()}>Load more products...</button>
        </div>
    )
}