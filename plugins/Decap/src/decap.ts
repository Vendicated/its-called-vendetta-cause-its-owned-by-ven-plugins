const re = /^[A-Z][a-z']*[.,!?:;]*$/;

export function decap(text: string) {
    if (!text || text.length < 2) return text;

    const out = [] as string[];

    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        const goToClosing = (sequence: string) => {
            const buf = [word];

            for (let j = i + 1; j < words.length; j++) {
                buf.push(words[j]);
                if (words[j].includes(sequence)) {
                    out.push(...buf);
                    i = j;
                    return;
                }
            }

            out.push(word);
        };

        if (word.startsWith("https://")) out.push(word);
        else if (word.startsWith("```")) goToClosing("```");
        else if (word.startsWith("`")) goToClosing("`");
        else out.push(word.replace(re, m => m.toLowerCase()));
    }

    return out.join(" ");
}
