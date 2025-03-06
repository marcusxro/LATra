import React, { useEffect, useState } from "react";
import { Signimage } from "../handimage";

interface SignConverterProps {
    handlePopUp: () => void;
    text: string;
}

const SignConverter: React.FC<SignConverterProps> = ({ handlePopUp, text }) => {


    const [textAreaVal, setTextAreaVal] = useState<string>("");

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
                className="bg-[#ffffff] flex flex-col rounded-lg p-6 shadow-lg w-full h-full max-w-[800px] max-h-[900px] overflow-auto text-center"
            >
                <h1 className="text-2xl font-bold pb-5 border-b-[1px] border-b-[#535353]">
                    {
                        languageChosen === "English" ?
                            "Convert text to Sign Language"
                            : "Isalin ang teksto sa Wikang Pasenyas"
                    }
                </h1>


                <div className="h-full w-full overflow-auto mt-2">


                    {/* Display sign images below */}
                    <div className="flex flex-wrap justify-start gap-2 pt-5">
                        {textAreaVal
                            .split("")
                            .filter((letter) => /^[a-zA-Z\s]$/.test(letter) && letter !== "\n") // Allow only letters and spaces, exclude Enter
                            .map((letter, i) => {
                                const imgSrc = Signimage[letter.toUpperCase()];

                                if (letter === " ") {
                                    // Render a space with margin for visibility
                                    return <div key={i} className="w-4"></div>;
                                }

                                return (
                                    <img
                                        key={i}
                                        src={imgSrc?.src}
                                        alt={letter}
                                        className="h-15 w-15 filter brightness-0 invert-0"
                                    />
                                );
                            })}
                    </div>


                </div>


                <textarea
                    value={textAreaVal}
                    onChange={(e) => setTextAreaVal(e.target.value)}
                    placeholder="Type here..."
                    className="w-full h-40 outline-none bg-gray-200 resize-none mt-5 p-2 border-[1px] border-[#535353] rounded-lg">
                    asds
                </textarea>
            </div>
        </div>
    );
};

export default SignConverter;
