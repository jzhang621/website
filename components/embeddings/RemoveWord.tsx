import React from 'react';

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

    // Calculate min and max similarity
    const similarities = words.map((word) => word.similarity);
    const minSimilarity = Math.min(...similarities);
    const maxSimilarity = Math.max(...similarities);

    console.log({ minSimilarity, maxSimilarity });

    const indices = words.map((word, index) => index);
    // generate a random permutation of the indices
    const randomIndices = indices.sort(() => Math.random() - 0.5);

    let count = 0;
    return (
        <div>
            {Object.entries(paragraphs)
                .slice(0, maxParagraphs)
                .map(([paragraphIndex, sentences]) => {
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
                            const scaledOpacity =
                                (similarityToUse.similarity - minSimilarity) /
                                (maxSimilarity - minSimilarity);
                            // const scaledOpacity = similarityToUse.similarity;
                            const backgroundColor = `rgba(0, 255, 0, ${1 - scaledOpacity})`;
                            count++;
                            return (
                                <>
                                    <span
                                        style={{
                                            backgroundColor,
                                            // opacity: 1,
                                            display: "inline", // Add this to ensure inline rendering
                                        }}
                                        title={(1 - scaledOpacity).toFixed(2)}
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
        </div>
    );
};

export default SentenceRenderer;