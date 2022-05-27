import { Stack, IStackTokens } from "@fluentui/react";
import ResultCard, { Extension } from "./ResultCard";

const stackTokens: IStackTokens = { childrenGap: 20 };

function ResultList({ results }: { results: Extension[] }) {
    return (
        <Stack tokens={stackTokens}>
            {results.map((result: Extension) => (
                <ResultCard key={result.extensionId} extension={result} />
            ))}
        </Stack>
    );
}

export default ResultList;
