import { useEffect, useState } from 'react';
import Quotes from './quotes';
import InspirationalQuote from './quote';
import Loading from './loading';


// The form for changing the count and submitting the form is in the <Quotes> component.
// You'll need to pass in the count as well as event handlers for onChange and onSubmit.
// Add the correct typing for the children in the <Quotes /> component.
// Add the correct typing for the onSubmit event handler.

export type Quote = {
  id: number;
  content: string;
  source?: string;
};

export const fetchRandomQuote = async () => {
  const response = await fetch(`/api/quotes/random`);
  return response.json();
};

export const fetchQuotes = async (count: number) => {
  const response = await fetch(`/api/quotes?limit=${count}`);
  return response.json();
}

const Application = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [count, setCount] = useState(10);

  useEffect(() => {
    fetchQuotes(count).then(setQuotes);
  }, [count]);

  return (
    <main className="w-full max-w-2xl py-16 mx-auto">
      {/* <InspirationalQuote content={quote.content} source={quote.source} /> */}
      <Quotes onSubmit={() => fetchQuotes(count)} count={count} onChange={(e) => setCount(+e.target.value)} >
        {quotes.map((quote) => {
          return (
            <div key={quote.id}>
              <InspirationalQuote key={quote.id} content={quote.content} source={quote.source} />
            </div>
          )
        })}
      </Quotes>
    </main>
  );
};

export default Application;
