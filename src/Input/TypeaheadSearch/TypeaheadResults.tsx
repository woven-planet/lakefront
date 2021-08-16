import { FC, ReactNode, useEffect, useState } from 'react';
import { TypeaheadError, TypeaheadResultsContainer } from './typeaheadSearchStyles';
import Loading from 'src/Loading/Loading';

const NO_RESULTS_MESSAGE = 'No results were returned.';
const ERROR_MESSAGE = 'An error occured when searching.';

export interface TypeaheadResultItem {
    label: ReactNode;
    value: string;
}

interface TypeaheadResultsProps {
    debouncedText: string;
    fetchResults?: (searchText: string) => Promise<TypeaheadResultItem[]>;
}

const TypeaheadResults: FC<TypeaheadResultsProps> = ({ debouncedText, fetchResults }) => {
    const [results, setResults] = useState<TypeaheadResultItem[]>([]);
    const [error, setError] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        setFetching(true);
        setError('');

        if (fetchResults) {
            fetchResults(debouncedText)
                .then((resultItems) => {
                    setResults(resultItems);
                    setFetching(false);
                })
                .catch(() => {
                    setError(ERROR_MESSAGE);
                    setFetching(false);
                });
            return;
        }

        setFetching(false);
    }, [fetchResults, debouncedText]);

    if (fetching) {
        return <Loading label="Searching..." />;
    }

    if (error) {
        return <TypeaheadError className="typeaheadError">{ERROR_MESSAGE}</TypeaheadError>;
    }

    if (!results.length) {
        return <div>{NO_RESULTS_MESSAGE}</div>;
    }

    return (
        <TypeaheadResultsContainer>
            <div className="resultsHeader">Results</div>
            <ul className="resultsList">
                {results.map(({ label }) => (
                    <li className="resultItem">{label}</li>
                ))}
            </ul>
        </TypeaheadResultsContainer>
    );
};

export default TypeaheadResults;
