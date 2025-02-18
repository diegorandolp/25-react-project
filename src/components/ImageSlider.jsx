import {useState, useEffect} from "react";

const API_KEY = import.meta.env.VITE_ACCESS_KEY_UNSPLASH;

export default function ImageSlider({count=5}) {
    useEffect(() => {
       const controller = new AbortController();
       const signal = controller.signal;

        async function getImages(){
            const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;
            const images = [];
            fetch(apiUrl).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            }).then(data => {
                    setImages(data.map((image) => image.urls.raw));
                }
            ).catch((error) => {
                console.error(error);
            });
        }

        getImages();

        return () => {
            controller.abort();
        }
    }, []);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    return (
        <div className="image-slider">
            <h1>Image Slider</h1>
            <img src={images[currentImage]} alt="random"/>
            <button
                onClick={() => {
                    if (currentImage > 0) {
                        setCurrentImage(currentImage - 1);
                    }
                }}>Prev</button>
            <button
                onClick={() => {
                    if (currentImage < images.length - 1) {
                        setCurrentImage(currentImage + 1);
                    }
            }}>Next</button>
        </div>
    )
}