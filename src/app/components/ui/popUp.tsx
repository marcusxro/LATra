import { Signpass } from '../handimage/index'
import AHand from '../../components/handimage/Ahand.svg'

const PopUp = ({ handlePopUp }: { handlePopUp: () => void }) => {
    console.log(Signpass);

    console.log(AHand);
    return (
        <div
            onClick={handlePopUp}
            className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg p-4"
            >
                <h1 className="text-2xl font-bold pb-5">Dictionary</h1>

                <div className="grid grid-cols-9 gap-4">
                    {Signpass.map((item: any) => (
                        <div key={item.alt} className="flex flex-col items-center">
                            <div>{item.alt}</div>
                            <img 
                                src={item.src} 
                                alt={item.alt} 
                                className="w-16 h-16" // You can adjust the size as needed
                            />
                        </div>
                    ))}

                </div>

                <div className="grid grid-cols-9 gap-4">
                    <AHand  className='w-16 h-16'/>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
