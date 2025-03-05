import { useState, useEffect } from "react";
import DictionaryPic from '../../assets/dictionary.png'
const Dictionary = ({ handlePopUp }: { handlePopUp: () => void }) => {
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


    const [languageChosen, setlanguageChosen] = useState<String>("");


    useEffect(() => {

        setlanguageChosen(localStorage.getItem("selectedLanguage") || "English")

        console.log("languageChosen", languageChosen)
    }, [languageChosen])

    return (
        <div
            onClick={handlePopUp}
            className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg p-6 shadow-lg w-80 text-center"
            >
                <h1 className="text-2xl font-bold pb-5">
                    {
                        languageChosen === "English" ?
                            "Dictionary"
                            : "Diksyunaryo"
                    }
                </h1>

        <div >
            <img src={DictionaryPic.src} alt="" />
        </div>
               
            </div>
        </div>
    );
};

export default Dictionary;
