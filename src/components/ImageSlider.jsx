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
                    setImages(data.map((image) => image.urls.small));
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
            <div className="slider">
                <img src={images[currentImage]} alt="random"/>
                <div className="relative bottom-1/2 flex justify-between mx-4">
                    <button
                        onClick={() => {
                            if (currentImage > 0) {
                                setCurrentImage(currentImage - 1);
                            }
                        }}>
                        <LeftArrow/>
                    </button>
                    <button
                        onClick={() => {
                            if (currentImage < images.length - 1) {
                                setCurrentImage(currentImage + 1);
                            }
                        }}>
                        <RightArrow/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export function LeftArrow(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="3em"
            height="3em"
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="14" height="14" fill="white" opacity="0.2" rx="7" />
                <path d="M8 4L5 7l3 3"></path>
                <circle cx="7" cy="7" r="6.5"></circle>
            </g>
        </svg>
    )
}
export function RightArrow(
    props,
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="3em"
            height="3em"
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="14" height="14" fill="white" opacity="0.2" rx="7" />
                <path d="m6 4l3 3l-3 3"></path>
                <circle cx="7" cy="7" r="6.5"></circle>
            </g>
        </svg>
    )
}
