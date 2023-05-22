/* eslint-disable react/prop-types */
function CardFront({number, suit}) {
    return (
        <>
        <p className=" text-lg font-bold font-mono p-0">
        {number}
        </p>
        <img src={"/src/assets/"+ suit + ".svg"} alt="suit" />
        </>
    )

}

export default CardFront