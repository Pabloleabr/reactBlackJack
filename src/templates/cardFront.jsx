import pica from "/src/assets/pica.svg"
import corazon from "/src/assets/corazon.svg"
import diamante from  "/src/assets/diamante.svg"
import trebol from "/src/assets/trebol.svg"


const PALOSIMG = {//necesary for the build to include the images
    pica: pica,
    corazon: corazon,
    diamante: diamante,
    trebol: trebol
}
/* eslint-disable react/prop-types */
function CardFront({number, suit}) {
    return (
        <div className="card rounded">
        <p className=" text-lg font-bold font-mono p-0 pl-1">
        {number}
        </p>
        <img src={PALOSIMG[suit]} alt={suit} className="p-1"/>
        </div>
    )

}

export default CardFront