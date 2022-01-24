import Part from './Part';

const Content = ({ key, parts }) => { 
    return(
        <>
            {parts.map(part => 
                <Part key={key} part={part}/>    
            )}
        </>
    )
}

export default Content;