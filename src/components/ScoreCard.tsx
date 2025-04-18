import { useEffect, useState } from "react";
import {
  DomainKey,
  domainLabels,
  evaluationMetrics,
} from "../constant/evaluation";

// Define interface for conversation data items
interface ConversationItem {
  question: string;
  comment: string;
}

const ScoreCard = ({
  inputData,
  className,
}: {
  inputData: any;
  className: string;
}) => {
  const [openDomains, setOpenDomains] = useState<DomainKey[]>([]);

  // State to capture the case from inputData.
  const [evaluationCase, setEvaluationCase] = useState<string>("Unknown Case");

  // Default metric scores for all domains.
  const defaultMetricScores: Record<DomainKey, Record<string, number>> = {
    domain1: {},
    domain2: {},
    domain3: {},
    domain4: {},
  };

  // Extract metric scores from inputData, or use default.
  const metricScores: Record<
    DomainKey,
    Record<string, number>
  > = inputData?.evaluationMetricScores ?? defaultMetricScores;

  // Update evaluationCase when inputData changes.
  useEffect(() => {
    if (inputData && inputData.case) {
      setEvaluationCase(inputData.case);

      console.log(inputData.evaluationMetricScores);
    } else {
      setEvaluationCase("Unknown Case");
    }
  }, [inputData]);

  // Determine current case.
  const currentCase = evaluationCase || "Unknown Case";

  // Build an array of domain entries by computing each domain's total score from its metric scores.
  const domainEntries = (Object.keys(domainLabels) as DomainKey[]).map(
    (domainKey) => {
      const metrics = evaluationMetrics[currentCase][domainKey] || [];
      const computedScore = metrics.reduce((sum, metric) => {
        const scoreForMetric =
          (metricScores[domainKey] && metricScores[domainKey][metric.id]) ?? 0;
        return sum + scoreForMetric;
      }, 0);
      const computedMax = metrics.reduce(
        (sum, metric) => sum + metric.maxScore,
        0
      );
      return {
        domainKey,
        label: domainLabels[domainKey],
        score: computedScore,
        max: computedMax,
      };
    }
  );

  // Calculate overall total score and overall maximum score.
  const totalScore = domainEntries.reduce((sum, entry) => sum + entry.score, 0);
  // const totalMaxPoints = domainEntries.reduce(
  //   (sum, entry) => sum + entry.max,
  //   0
  // );

  // Determine highest and lowest scoring domains.
  const sortedDomains = [...domainEntries].sort((a, b) => b.score - a.score);
  const highestDomain = sortedDomains[0];
  const lowestDomain = sortedDomains[sortedDomains.length - 1];

  // Toggle open/close state for a domain.
  const toggleDomain = (domainKey: DomainKey) => {
    if (openDomains.includes(domainKey)) {
      setOpenDomains(openDomains.filter((key) => key !== domainKey));
    } else {
      setOpenDomains([...openDomains, domainKey]);
    }
  };

  // Get conversation data from inputData or use empty array if not available
  const conversationData: ConversationItem[] = inputData?.conversationData || [];

  return (
    <div
      className={`bg-white rounded-lg shadow-lg px-4 py-4 ${className} overflow-y-auto`}
    >
      <div className="text-2xl font-bold mb-3 mt-1">
        Total Score: {totalScore}
      </div>

      <div className="flex gap-4 mb-3 mx-2">
        <div className="w-6/12">
          <strong>Highest Performance</strong>:
          <br />
          Your highest score is in{" "}
          <b className="text-green-500">
            <br />
            {highestDomain?.label}
          </b>
        </div>
        <div className="w-6/12">
          <strong>Lowest Performance</strong>:<br />
          Your lowest score is in{" "}
          <b className="text-red-600">
            <br />
            {lowestDomain?.label}
          </b>
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 space-y-4">
          {domainEntries.map(({ domainKey, label, score, max }) => {
            // Compute percentage for the overall domain progress bar.
            const percentage = max > 0 ? Math.round((score / max) * 100) : 0;

            return (
              <div
                key={domainKey}
                className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{label}</div>
                  <div className="text-sm">
                    {score} / {max}
                  </div>
                </div>
                {/* Overall domain progress bar (green) */}
                <div className="mt-2 bg-gray-200 w-full h-3 rounded-full">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {/* Toggle button for evaluation metrics */}
                <button
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => toggleDomain(domainKey)}
                >
                  {openDomains.includes(domainKey) ? "Hide" : "View"} Evaluation
                  Metrics
                </button>
                {/* Detailed evaluation metrics for the domain */}
                {openDomains.includes(domainKey) && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <ul className="list-disc list-inside">
                      {evaluationMetrics[currentCase][domainKey] &&
                      evaluationMetrics[currentCase][domainKey].length > 0 ? (
                        evaluationMetrics[currentCase][domainKey].map(
                          (metric, idx) => {
                            const studentScore =
                              (metricScores[domainKey] &&
                                metricScores[domainKey][metric.id]) ??
                              0;
                            return (
                              <li key={idx} className="mb-3">
                                <strong>{metric.id}.</strong>{" "}
                                {metric.description} –{" "}
                                <span className="text-red-800 inline whitespace-nowrap">
                                  Score: {studentScore} / {metric.maxScore}{" "}
                                  points
                                </span>
                                {/* Discrete bars for this metric */}
                                <div className="flex space-x-1 mt-2 ml-5">
                                  {Array.from({
                                    length: metric.maxScore,
                                  }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-4 h-4 rounded ${
                                        studentScore > i
                                          ? "bg-green-500"
                                          : "bg-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </li>
                            );
                          }
                        )
                      ) : (
                        <li>
                          No evaluation metrics available for this section.
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
          {/* Conversation Data Section */}
          {conversationData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Questions analysis</h3>
              <div className="space-y-4">
                {conversationData.map((item: ConversationItem, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
                  >
                    <div className="mb-2">
                      <span className="font-semibold text-blue-600">Question:</span>
                      <p className="mt-1 ml-2">{item.question}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-green-600">Comment:</span>
                      <p className="mt-1 ml-2">{item.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
