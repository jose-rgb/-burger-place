
type OpeningHoursProps = {
    isOpenStore: boolean;
}

export function OpeningHours({isOpenStore}: OpeningHoursProps) {

    return(
        <>
            {
                isOpenStore ?
                    <div className='bg-green-500 px-4 py-1 rounded-lg mt-5'>
                        <span className="text-white font-medium">Quarta á Domingo - 18:00 as 22:00</span>
                    </div>
                :
                    <div className='bg-red-500 flex flex-col px-4 py-1 rounded-lg mt-5'>
                        <span className="text-white font-medium"> fechado - Quarta á Domingo - 18:00 as 22:00</span>
                    </div>
            }
        </>
    )
}