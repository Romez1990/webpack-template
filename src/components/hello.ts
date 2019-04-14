const word: string = 'world';
export default {
    word: word,
    say(): void {
        console.log(`Hello, ${this.word}`);
    },
};
