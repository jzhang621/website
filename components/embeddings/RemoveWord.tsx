import { join } from "path";
import React from "react";

interface WordData {
    removed_word: string;
    similarity: number;
    sentence_index: number;
    word_index: number;
    punctuation: string;
    paragraph_index?: number;
}

interface SentenceRendererProps {
    words: WordData[];
    randomColor?: boolean;
    maxParagraphs?: number;
}

interface ScaleProps {
    minOpacity: number;
    maxOpacity: number;
}

const SimilarityScale: React.FC<ScaleProps> = ({ minOpacity, maxOpacity }) => {
    return (
        <div className="flex flex-col items-center my-4">
            <div className="flex w-64 h-8 relative">
                {/* Gradient bar */}
                <div
                    className="w-full h-full rounded"
                    style={{
                        background: `linear-gradient(to right, rgba(0, 255, 0, ${minOpacity}), rgba(0, 255, 0, ${maxOpacity}))`,
                    }}
                />
                {/* Labels */}
                <div className="absolute -bottom-6 left-0 text-sm">{minOpacity.toFixed(2)}</div>
                <div className="absolute -bottom-6 right-0 text-sm">{maxOpacity.toFixed(2)}</div>
            </div>
            <div className="text-sm text-gray-500 mt-8">Difference in cosine similarity</div>
        </div>
    );
};

const SentenceRenderer: React.FC<SentenceRendererProps> = ({
    words,
    randomColor = false,
    maxParagraphs = 4,
}) => {
    // Group words by paragraph index first, then by sentence index
    const paragraphs: { [key: number]: { [key: number]: WordData[] } } = {};

    words.forEach((word) => {
        const paragraphIndex = word.paragraph_index ?? -1; // Use -1 for words without paragraph
        const sentenceIndex = word.sentence_index;

        if (!paragraphs[paragraphIndex]) {
            paragraphs[paragraphIndex] = {};
        }
        if (!paragraphs[paragraphIndex][sentenceIndex]) {
            paragraphs[paragraphIndex][sentenceIndex] = [];
        }

        paragraphs[paragraphIndex][sentenceIndex].push(word);
    });

    // Get first maxParagraphs paragraphs
    const limitedParagraphs = Object.entries(paragraphs).slice(0, maxParagraphs);

    // Calculate min and max similarity only from words in the limited paragraphs
    const limitedWords = limitedParagraphs.flatMap(([_, sentences]) =>
        Object.values(sentences).flat()
    );

    // Calculate min and max similarity
    const similarities = limitedWords.map((word) => word.similarity);
    const minSimilarity = Math.min(...similarities);
    const maxSimilarity = Math.max(...similarities);

    const indices = words.map((word, index) => index);
    // generate a random permutation of the indices
    const randomIndices = indices.sort(() => Math.random() - 0.5);

    let count = 0;
    return (
        <div>
            {limitedParagraphs.map(([paragraphIndex, sentences]) => {
                const hasParagraph = paragraphIndex !== "-1";

                const content = Object.keys(sentences).map((sentenceIndex) => {
                    const sentenceWords = sentences[Number(sentenceIndex)];
                    return sentenceWords.map((word, index) => {
                        let similarityToUse = word;
                        // if randomColor is true, use a random word's similarity.
                        // this is done to show the difference between "semantic highlighting" and "random highlighting"
                        if (randomColor) {
                            similarityToUse = words[randomIndices[count]];
                        }
                        // const scaledOpacity =
                        //     (similarityToUse.similarity - minSimilarity) /
                        //     (maxSimilarity - minSimilarity);

                        const value = 1 - similarityToUse.similarity;

                        // const scaledOpacity = similarityToUse.similarity;
                        // const backgroundColor = `rgba(0, 255, 0, ${1 - scaledOpacity})`;
                        const backgroundColor = `rgba(0, 255, 0, ${value})`;
                        count++;
                        return (
                            <>
                                <span
                                    style={{
                                        backgroundColor,
                                        // opacity: 1,
                                        display: "inline", // Add this to ensure inline rendering
                                    }}
                                    title={value.toFixed(2)}
                                >
                                    {word.removed_word}
                                </span>{" "}
                            </>
                        );
                    });
                });

                return hasParagraph ? (
                    <p key={paragraphIndex} className="p-2">
                        {content}
                    </p>
                ) : (
                    content
                );
            })}
            <SimilarityScale minOpacity={1 - maxSimilarity} maxOpacity={1 - minSimilarity} />
        </div>
    );
};

export default SentenceRenderer;
