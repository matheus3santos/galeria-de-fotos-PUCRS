import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar"; // Certifique-se de que a importação esteja correta

const ImageGrid = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("https://picsum.photos/v2/list");
                if (!response.ok) {
                    throw new Error("Erro ao buscar as imagens.");
                }
                const data = await response.json();
                setImages(data);
                setFilteredImages(data); // Inicializa as imagens filtradas com todas as imagens
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Carregando imagens...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Erro: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4 text-center">Galeria de Imagens</h1>
            <SearchBar images={images} setFilteredImages={setFilteredImages} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {filteredImages.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhuma foto encontrada</p>
                ) : (
                    filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="rounded overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            <img
                                src={image.download_url}
                                alt={image.author}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-sm font-semibold text-center">{image.author}</h2>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ImageGrid;
