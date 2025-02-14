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
    console.log(images);
    return (
        <div>
            <h1>Image Slider</h1>
            <img src={images[currentImage]} alt="random"/>
        </div>
    )
}