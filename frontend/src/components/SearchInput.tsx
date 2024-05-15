import React from 'react';

type SearchInputProps = {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: React.FC<SearchInputProps> = ({ setSearchQuery }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update search query state in the parent component
    };

    return (
        <div className="flex items-center max-w-md mx-auto bg-base-100 rounded-lg mt-2 mb-2 mr-2 border" >
            <div className="w-full">
                <input
                    type="search"
                    className="w-full px-4 py-1 text-accent bg-base-100 rounded-full focus:outline-none"
                    placeholder="Pesquisar..."
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="flex items-center justify-center w-12 h-12 text-accent rounded-r-lg"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SearchInput;
