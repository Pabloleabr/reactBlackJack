/* eslint-disable react/prop-types */
function CardFront({number, suit}) {
    return (
        <div className="card rounded">
        <p className=" text-lg font-bold font-mono p-0 pl-1">
        {number}
        </p>
        <img src={"/public/assets/"+ suit + ".svg"} alt={suit} className="p-1"/>
        </div>
    )

}

export default CardFront