import React from "react";

import InfoSectionComponent from "components/InfoSection/InfoSectionComponent";
import dateFormatter from "utilities/dateFormatter";
import colors from "configuration/colors";
import "./ReportInfo.css";
import CircleProgressBar from "components/CircleProgressBar/CircleProgressBar";
import colorSpecifier from "utilities/colorSpecifier";
import ReportColorExplanation from "../ReportColorExplanation";
import { translateWorkShifts } from "utilities/commonUtilities";
import QualityControlList from "pages/quality-control/qualityControlList/QualityControlsList";
import DowntimesList from "pages/downtimes/DowntimesList";
import BreakdownList from "pages/breakdowns/BreakdownsList";
import OeeProgressBar from "components/OeeProgressBar/OeeProgressBar";
import MaterialList from "pages/materials/MaterialList";

const LineReportInfo = ({ report }) => {
  return (
    <InfoSectionComponent title="Raport:">
      {!report && (
        <h3 style={{ color: colors.danger }}>Brak aktywnego raportu</h3>
      )}
      {report && (
        <div className="">
          <InformationSection report={report} />
          <ProductionSection report={report} />
          <QualityControlSection qualityControls={report.qualityControls} />
          <DowntimesSection downtimes={report.downtimes} />
          <BreakdownSection breakdowns={report.breakdowns} />
          <MaterialList materials={report.materials} />
        </div>
      )}
    </InfoSectionComponent>
  );
};

const InformationSection = ({ report }) => {
  return (
    <div className="">
      <div className="info-form-row-style">
        <span>Id:</span>
        <span>{report.id}</span>
      </div>
      <div className="info-form-row-style">
        <span>Linia:</span>
        <span>{report.lineName}</span>
      </div>
      <div className="info-form-row-style">
        <span>Produkt:</span>
        <span>{report.productName}</span>
      </div>
      <div className="info-form-row-style">
        <span>Zmiana:</span>
        <span>{translateWorkShifts(report.reportWorkShift)}</span>
      </div>
      <div className="info-form-row-style">
        <span>Wydajność zmianowa:</span>
        <span>{`${report.targetAmount} szt.`}</span>
      </div>
      <div className="info-form-row-style">
        <span>Oczekiwana wydajnność na godzine:</span>
        <span>{`${report.statistics.expectedProductionPerHour} szt.`}</span>
      </div>
      <div className="info-form-row-style">
        <span>Aktualna wydajnność na godzine:</span>
        <span>{`${report.statistics.currentProductionPerHour} szt.`}</span>
      </div>
      {!(report.reportState === "OPEN") && (
        <div className="info-form-row-style">
          <span>Odpad:</span>
          <span>{`${report.trashAmount} szt.`}</span>
        </div>
      )}
      <div className="info-form-row-style">
        <span>Utworzony przez:</span>
        <span>{report.createOperator}</span>
      </div>

      <div className="info-form-row-style">
        <span>Data utworzenia:</span>
        <span>{dateFormatter(report.creationDate)}</span>
      </div>

      {report.reportState === "CLOSED" && (
        <div className="info-form-row-style">
          <span>Zamknięty przez:</span>
          <span>{report.finishOperator}</span>
        </div>
      )}

      {report.reportState === "CLOSED" && (
        <div className="info-form-row-style">
          <span>Data zamknięcia:</span>
          <span>{dateFormatter(report.finishDate)}</span>
        </div>
      )}

      <div className="info-form-row-style">
        <span>Czas pracy:</span>
        <span>{`${report.statistics.workingTime.hours} h ${report.statistics.workingTime.minutes} min`}</span>
      </div>
    </div>
  );
};

const ProductionSection = ({ report }) => {
  return (
    <div className="">
      <ReportColorExplanation title="Produkcja" />
      <div className="production-section-container">
        <OeeProgressBar
          oee={report.statistics.oee}
          subtitle={`${report.statistics.oee} %`}
        />

        <ProductionCircleBar
          value={report.statistics.expectedProductionPercent}
          title="Oczekiwana"
          subtitle={`${report.statistics.expectedProduction} szt.`}
          color={colors.primary}
        />
        <ProductionCircleBar
          value={report.statistics.currentProductionPercent}
          title="Rzeczywista"
          subtitle={`${report.amount} szt.`}
          color={colorSpecifier.report(
            report.statistics.currentProductionPercent,
            report.statistics.expectedProductionPercent
          )}
        />
      </div>
    </div>
  );
};

const QualityControlSection = ({ qualityControls }) => {
  return (
    <div className="" style={{ width: "100%" }}>
      <QualityControlList qualityControls={qualityControls} />
    </div>
  );
};

const ProductionCircleBar = ({ value, title, subtitle, color }) => {
  return (
    <CircleProgressBar
      value={value}
      title={title}
      subtitle={subtitle}
      color={color}
    />
  );
};

const DowntimesSection = ({ downtimes }) => {
  return (
    <div className="" style={{ width: "100%" }}>
      <DowntimesList downtimes={downtimes} />
    </div>
  );
};

const BreakdownSection = ({ breakdowns }) => {
  return (
    <div className="" style={{ width: "100%" }}>
      <BreakdownList breakdowns={breakdowns} />
    </div>
  );
};
export default LineReportInfo;
