import React from 'react';

const Navigation = () => {
    return (
        <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold text-slate-900">Tasks</h1>
            <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <i className="bi bi-gear text-slate-600"></i>
                </button>
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <i className="bi bi-person text-slate-600"></i>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
