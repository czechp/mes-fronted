import React from "react";

import "../../../GlobalStyle.css";
import { getColorByState, getColorForLineState, getLineStatus, getWorkingTime } from "utilities/commonUtilities";
import InfoSectionComponent from "components/InfoSection/InfoSectionComponent";


const LineDetailsInfo = ({line})=>{
 
    return (
        <InfoSectionComponent title="Informacje podstawowe:">
        <div className="info-form-row-style">
            <span>Nazwa:</span>
            <span>{line.name}</span>
        </div>
        <div className="info-form-row-style">
            <span>Status:</span>
            <span style={{ color: getColorForLineState(line.lineStatus) }}>{getLineStatus(line.lineStatus)}</span>
        </div>
        <div className="info-form-row-style">
            <span>Operator:</span>
            <span>{line.operator ? line.operator : "Brak"}</span>
        </div>
        <div className="info-form-row-style">
            <span>Produkt:</span>
            <span>{line.productName}</span>
        </div>
        <div className="info-form-row-style">
            <span>Typ produktu:</span>
            <span>{line.productionType}</span>
        </div>
        <div className="info-form-row-style">
            <span>Aktualny licznik produktu:</span>
            <span>{line.currentCounter}</span>
        </div>
        <div className="info-form-row-style">
            <span>Długość zmiany:</span>
            <span>{getWorkingTime(line.workingHours)}</span>

        </div>
        <div className="info-form-row-style">
            <span>System monitorowania operatora:</span>
            <span style={{ color: getColorByState(!line.rfidReaderError) }}>{!line.rfidReaderError ? ("Włączony") : ("Wyłączony")}</span>
        </div>
        <div className="info-form-row-style">
            <span>System monitorowania produkcji:</span>
            <span style={{ color: getColorByState(!line.opcUaCommunicationError) }}>{!line.opcUaCommunicationError ? ("Włączony") : ("Wyłączony")}</span>
        </div>
        </InfoSectionComponent>


    );
}

export default LineDetailsInfo;