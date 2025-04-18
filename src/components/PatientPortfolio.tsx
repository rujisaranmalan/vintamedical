const PatientPortfolio = ({ patientData }: { patientData: any }) => {
  return (
    <div className="w-full flex flex-col h-[calc(100vh-340px)] overflow-y-auto">
      {patientData && (
        <div className="mb-4">
          <h3 className="font-semibold text-blue-500">Patient Information</h3>
          <p>
            <strong>Name:</strong> {patientData.Name}
          </p>
          <p>
            <strong>Sex:</strong> {patientData.Sex}
          </p>
          <p>
            <strong>Age:</strong> {patientData.Age}
          </p>
          <p>
            <strong>Occupation:</strong> {patientData.Occupation}
          </p>
          <p>
            <strong>Medical condition:</strong> {patientData.Medical_condition}
          </p>
          <p>
            <strong>Drug allergy:</strong> {patientData.Drug_allergy}
          </p>
          <p>
            <strong>Food allergy:</strong> {patientData.Food_allergy}
          </p>
          <p>
            <strong>Chief complaint:</strong> {patientData.CC}
          </p>
          <p>
            <strong>Temperature:</strong> {patientData.Temp}
          </p>
          <p>
            <strong>Blood pressure:</strong> {patientData.BP}
          </p>
          <p>
            <strong>Pulse rate:</strong> {patientData.PR}
          </p>
          <p>
            <strong>Respiratory rate:</strong> {patientData.RR}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientPortfolio;
