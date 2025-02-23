import {useState, useEffect} from "react";

const API_URL = import.meta.env.VITE_PLATZI_URL;

export default function LoadMoreProducts(){
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal

        async function getProducts(){
            try {
                setLoading(true);
                const apiUrlPagination = `${API_URL}?offset=0&limit=10`;
                const response = await fetch(apiUrlPagination, {signal});
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result)
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

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div>
            {products.map((item, key) => (
                <p>{item.title}</p>
            ))}
            <p>{error}</p>
        </div>
    )
}