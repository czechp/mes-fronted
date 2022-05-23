import React from 'react';

const TitleComponent = ({title})=>{

    return (
        <div className="bg-secondary" style={titleComponentStyle}>
            <h2>{title}</h2>
        </div>
    );
}

const titleComponentStyle = {
    paddingTop: "30px",
    paddingBottom: "30px",
}


export default TitleComponent;