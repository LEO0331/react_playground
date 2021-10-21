import React from 'react';
import './SeasonDisplays.css';
//import "semantic-ui-css/semantic.min.css"; npm install semantic-ui-css
const seasonConfig = { //https://semantic-ui.com/elements/icon.html
    summer: {
        text: 'Sea and Beach',
        iconName: 'sun'
    },
    winter: {
        text: 'Chill and Movie',
        iconName: 'snowflake'
    }
}

const getSeason = (lat, month) => {
    if(month>2 && month<9){
        return lat > 0 ? 'summer' : 'winter';
    }else{
        return lat < 0 ? 'summer' : 'winter';
    }
}

const SeasonDisplays = (props) => {
    const season = getSeason(props.lat, new Date().getMonth());
    const {text, iconName} = seasonConfig[season];

    return (
        <div className={`season-display ${season}`}>
            <i className={`icon-left massive icon ${iconName}`}></i>
            <h1>{text}</h1>
            <i className={`icon-right massive icon ${iconName}`}></i>
        </div>
    );
};

export default SeasonDisplays;
