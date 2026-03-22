




import React from "react";

export default function AuthDivider() {
    return (
        <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>
    );
}