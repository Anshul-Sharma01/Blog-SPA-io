import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineSearch } from "react-icons/md";

function SearchBlogs({ onSearch, setFetchAll }) {
    const [query, setQuery] = useState("");

    const handleSearchBlogs = (e) => {
        e.preventDefault();
        if (!query) {
            toast.error("Search query not found !!");
            return;
        }
        onSearch(query);
    };

    const handleChangeInQuery = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length === 0) {
            setFetchAll(true);
        }
    };

    return (
        <div className="relative" id="input">
            <form onSubmit={handleSearchBlogs}>
                <input
                    value={query}
                    onChange={handleChangeInQuery}
                    placeholder="Enter blog title or category"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    id="floating_outlined"
                    type="text"
                />
                <button className="absolute top-3 right-3" type="submit">
                    <MdOutlineSearch className="text-3xl" />
                </button>
            </form>
        </div>
    );
}

export default SearchBlogs;
