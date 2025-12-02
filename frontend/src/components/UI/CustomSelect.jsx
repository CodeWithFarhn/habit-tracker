import { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ value, onChange, options, icon: Icon, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!containerRef.current?.contains(document.activeElement)) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setIsOpen(true);
                    setHighlightedIndex(prev =>
                        prev < options.length - 1 ? prev + 1 : 0
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setIsOpen(true);
                    setHighlightedIndex(prev =>
                        prev > 0 ? prev - 1 : options.length - 1
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (highlightedIndex >= 0 && options[highlightedIndex]) {
                        onChange(options[highlightedIndex].value);
                        setIsOpen(false);
                        setHighlightedIndex(-1);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setIsOpen(false);
                    setHighlightedIndex(-1);
                    break;
                case ' ':
                    e.preventDefault();
                    setIsOpen(!isOpen);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, highlightedIndex, options, onChange]);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div
            ref={containerRef}
            className="relative w-full"
        >
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-700 font-medium hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-0 transition-all duration-200 flex items-center justify-between"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 text-slate-500" />}
                    <span>{selectedOption?.label || placeholder}</span>
                </span>

                {/* Chevron Icon with Rotation Animation */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                    {options.map((option, index) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                                setHighlightedIndex(-1);
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors duration-100 ${value === option.value
                                    ? 'bg-blue-100 text-blue-700'
                                    : highlightedIndex === index
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-slate-700 hover:bg-blue-50'
                                }`}
                            role="option"
                            aria-selected={value === option.value}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}