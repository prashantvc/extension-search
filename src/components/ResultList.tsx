import ResultCard, { Extension } from "./ResultCard";

function ResultList({ results }: { results: Extension[] }) {
    return (
        <div style={{ overflowY: "scroll", height: "70vh" }}>
            {results.map((result: Extension) => (
                <div style={{ padding: "4px" }}>
                    <ResultCard key={result.extensionId} extension={result} />
                </div>
            ))}
        </div>
    );
}

export default ResultList;
