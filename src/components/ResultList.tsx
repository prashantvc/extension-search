import ResultCard, { Extension } from "./ResultCard";

function ResultList({ results }: { results: Extension[] }) {
    return (
        <ul>
            {results.map((result: Extension) => (
                <ResultCard key={result.extensionId} extension={result} />
            ))}
        </ul>
    );
}

export default ResultList;
