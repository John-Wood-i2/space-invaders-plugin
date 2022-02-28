import { chart, records } from "@i2analyze/notebook-sdk";

export function getNodeFromRecord(
  recordId: records.AnalyzeRecordId,
  chart: chart.IChart
) {
  return chart.nodes.find((node) => node.records.has(recordId))!;
}
