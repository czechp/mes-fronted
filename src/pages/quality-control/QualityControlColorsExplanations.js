import React  from "react";


import ColorExplanation from "components/ColorExplanation/ColorExplanation";
import colors from "configuration/colors";

const QualityControlColorsExplanation = () => {
    return <ColorExplanation title="Kontrola jakości" data={[
        {text: "OK", color: colors.success},
        {text: "NOK", color: colors.danger}
    ]} />
};


export default QualityControlColorsExplanation;