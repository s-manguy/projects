import sun from '../assets/sun.svg'
import water from '../assets/water.svg'
 
const quantity = {
    1: 'peu',
    2: 'modérement',
    3: 'beaucoup'
}

const CareScale = ({scaleValue, careType}) => {
    const range = [1, 2, 3]
    const scaleType = 
        careType ==='light' ? (
            <img src={sun} alt='sun-icon' /> 
        ) : (
            <img src={water} alt='water-icon'/>
        )   

    return (
        <div 
            onClick={ () => 
                alert(`Cette plante requiert ${quantity[scaleValue]} ${ 
                    careType === 'light' ? 'de lumière' : "d'arrosage"
                    }`
                ) 
            }
        >
            {range.map((rangeElem) =>           
                scaleValue >= rangeElem ? (
                    <span key={rangeElem.toString()}>{scaleType}</span>
                ) : null    
            )}
        </div>
    )
}
    
export default CareScale