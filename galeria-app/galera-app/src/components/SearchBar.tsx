import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Ícone de lupa

const SearchBar = ({ images, setFilteredImages }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filtra as imagens com base no autor
        const filtered = images.filter(image =>
            image.author.toLowerCase().includes(query)
        );
        setFilteredImages(filtered); // Atualiza as imagens filtradas
    };

    return (
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Buscar por autor..."
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
            />
            <button
                onClick={() => handleSearch({ target: { value: searchQuery } })}
                className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchBar;
