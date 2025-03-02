import { useState, useEffect } from "react";

const Language = ({ handlePopUp }: { handlePopUp: () => void }) => {
    const [selectedLang, setSelectedLang] = useState<string | null>(null);

    // Load saved language from localStorage
    useEffect(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        if (savedLang) {
            setSelectedLang(savedLang);
        }
    }, []);

    // Function to handle language selection
    const handleLanguageSelect = (language: string) => {
        setSelectedLang(language);
        localStorage.setItem("selectedLanguage", language);
        handlePopUp(); // Close the popup after selection
    };

    return (
        <div
            onClick={handlePopUp}
            className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg p-6 shadow-lg w-80 text-center"
            >
                <h1 className="text-2xl font-bold pb-5">Select Language</h1>

                <div className="space-y-3">
                    <button
                        onClick={() => handleLanguageSelect("English")}
                        className={`block w-full p-3 rounded-lg transition-all ${
                            selectedLang === "English"
                                ? "bg-blue-500 text-white font-semibold"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        English
                    </button>

                    <button
                        onClick={() => handleLanguageSelect("Filipino")}
                        className={`block w-full p-3 rounded-lg transition-all ${
                            selectedLang === "Filipino"
                                ? "bg-blue-500 text-white font-semibold"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        Filipino
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Language;
