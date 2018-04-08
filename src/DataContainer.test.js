// import React from 'react';
// import ReactDOM from 'react-dom';
import { cleanQuote } from './DataContainer';

describe('cleanQuote', () => {
  it('returns an empty string when no quote is provided', () => {
    const emptyQuote = cleanQuote('');
    expect(emptyQuote).toBe('');
  });

  it('returns an empty string when space is provided', () => {
    const emptyQuote = cleanQuote(' ');
    expect(emptyQuote).toBe('');
  });

  it('removes trailing commas', () => {
    expect(
      cleanQuote(`there’s nothing either good or bad but thinking makes it so,`)
    ).toBe('there’s nothing either good or bad but thinking makes it so');
  });

  it('removes bullets', () => {
    expect(
      cleanQuote(
        `Commit to seek Mutual Purpose. • Recognize the purpose behind the strategy. • Invent a Mutual Purpose. • Brainstorm new strategies.`
      )
    ).toBe(
      'Commit to seek Mutual Purpose. Recognize the purpose behind the strategy. Invent a Mutual Purpose. Brainstorm new strategies.'
    );
  });

  it('removes asterisks', () => {
    expect(
      cleanQuote(
        `✽  Postponement. If you’re feeling overwhelmed by your feelings`
      )
    ).toBe('Postponement. If you’re feeling overwhelmed by your feelings');
  });

  it('removes left / right parentheses beginning and end', () => {
    expect(cleanQuote(`(Eat food. Not too much. Mostly plants.)`)).toBe(
      'Eat food. Not too much. Mostly plants.'
    );
  });

  it('removes double quotes at beginning and end', () => {
    expect(
      cleanQuote(
        `"What is the ratio of the time I spend solving problems to the time I spend scaling successes?"`
      )
    ).toBe(
      'What is the ratio of the time I spend solving problems to the time I spend scaling successes?'
    );
  });

  it('removes left / right double quotation marks at beginning and end', () => {
    expect(
      cleanQuote(
        `“The future belongs to those who believe in the beauty of their dreams.”`
      )
    ).toBe(
      'The future belongs to those who believe in the beauty of their dreams.'
    );
  });

  it("doesn't remove left / right double quotation marks when there are multiple within the quote", () => {
    expect(
      cleanQuote(
        `“Apple,” Jobs admitted, “is like an intense love affair with a girl you really, really like, and then she decides to drop you and go out with someone who’s not so neat.”`
      )
    ).toBe(
      '“Apple,” Jobs admitted, “is like an intense love affair with a girl you really, really like, and then she decides to drop you and go out with someone who’s not so neat.”'
    );
  });

  it('removes left / right single quotation marks at beginning and end', () => {
    expect(
      cleanQuote(
        `‘there’s nothing either good or bad but thinking makes it so’`
      )
    ).toBe('there’s nothing either good or bad but thinking makes it so');
  });

  it('removes left / right single quotation marks at beginning and end', () => {
    expect(
      cleanQuote(
        `‘there’s nothing either good or bad but thinking makes it so’`
      )
    ).toBe('there’s nothing either good or bad but thinking makes it so');
  });

  // room—Should I do something I’m good at or something I love? Take a chance or play it safe?—until

  it('replaces multiple spaces with a single space', () => {
    expect(
      cleanQuote(
        `Commit to seek Mutual Purpose.  Recognize the purpose behind the strategy.`
      )
    ).toBe(
      'Commit to seek Mutual Purpose. Recognize the purpose behind the strategy.'
    );
  });
});
