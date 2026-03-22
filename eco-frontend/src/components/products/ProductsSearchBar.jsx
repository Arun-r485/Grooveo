
import React, { useState, useRef, useEffect } from "react";

function SortDropdown({ sort, onSort, sortOptions }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const activeLabel = sortOptions.find((o) => o.value === sort)?.label ?? "Sort";

    return (
        <div ref={ref} className="relative">

            {}
            <button
                onClick={() => setOpen((v) => !v)}
                className={`
          flex items-center justify-between gap-3
          min-w-[190px] px-4 py-3 rounded-xl text-sm font-semibold
          border-2 transition-all duration-200 shadow-sm
          ${open
                        ? "border-[#5a9a3a] bg-[#f0f7ea] text-[#1a2e1a]"
                        : sort !== "popular"
                            ? "border-[#5a9a3a] bg-[#f0f7ea] text-[#1a2e1a]"
                            : "border-[#c8e6b0] bg-white text-gray-600 hover:border-[#5a9a3a] hover:bg-[#f9fdf6]"
                    }
        `}
            >
                <div className="flex items-center gap-2">
                    {}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 flex-shrink-0 ${sort !== "popular" || open ? "text-[#5a9a3a]" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <span>{activeLabel}</span>
                </div>

                {}
                <div className="flex items-center gap-1.5">
                    {sort !== "popular" && (
                        <span className="w-2 h-2 rounded-full bg-[#5a9a3a] flex-shrink-0" />
                    )}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#5a9a3a]" : "text-gray-400"}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {}
            {open && (
                <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden py-1.5">

                    {}
                    <p className="px-4 pt-2 pb-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                        Sort by
                    </p>

                    <div className="px-2 py-1.5 flex flex-col gap-1">
                        {sortOptions.map((opt) => {
                            const isActive = sort === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => { onSort(opt.value); setOpen(false); }}
                                    className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left
                    font-medium transition-all duration-150 border-2
                    ${isActive
                                            ? "bg-[#f0f7ea] border-[#5a9a3a] text-[#1a2e1a]"
                                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-100"
                                        }
                  `}
                                >
                                    {}
                                    <span className={`
                    w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all
                    ${isActive
                                            ? "bg-[#5a9a3a] border-[#5a9a3a]"
                                            : "border-gray-200"
                                        }
                  `}>
                                        {isActive && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </span>

                                    <span className={isActive ? "font-semibold text-[#1a2e1a]" : ""}>{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProductsSearchBar({
    search,
    onSearch,
    sort,
    onSort,
    resultCount,
    sortOptions,
}) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">

            {}
            <div className="flex w-full sm:w-auto sm:flex-1 max-w-sm rounded-xl overflow-hidden border border-[#c8e6b0] focus-within:border-[#5a9a3a] transition-colors bg-white shadow-sm">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search products…"
                    className="flex-1 px-4 py-2.5 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400"
                />
                {search && (
                    <button
                        onClick={() => onSearch("")}
                        className="px-3 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
                    >
                        ×
                    </button>
                )}
                <div className="px-3 flex items-center text-[#5a9a3a]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {}
            <p className="text-sm text-gray-400 whitespace-nowrap hidden sm:block">
                <span className="font-bold text-[#1a2e1a]">{resultCount}</span> products
            </p>

            {}
            <div className="flex items-center gap-2 ml-auto">
                <SortDropdown sort={sort} onSort={onSort} sortOptions={sortOptions} />
            </div>
        </div>
    );
}