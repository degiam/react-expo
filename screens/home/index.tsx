import React, { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { Container, Section } from '@/components/Screen';

import axios from 'axios';

type QuoteProps = {
  content: string;
  author: string;
};

export default function HomeScreen() {
  const [quote, setQuote] = useState<QuoteProps | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      axios.get('https://zenquotes.io/api/quotes')
      .then((result: any) => {
        if (result.length > 0) {
          setQuote({
            content: result[0].q,
            author: result[0].a,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

    getQuote();
  },[]);

  return (
    <Container scrollable={true}>
      <Section>
        <Text heading={true} size='h2'>Selamat datang!</Text>
        {quote &&
          <View style={{ marginTop: 10, }}>
            <Text>{quote.content}</Text>
            <Text italic={true} style={{ marginTop: 5 }}>— {quote.author}</Text>
          </View>
        }
      </Section>

      <Section>
        <Text>
          Amet aliqua aute consectetur nisi Lorem veniam fugiat duis est.Commodo occaecat in non irure ex.Cillum est sit amet dolore ut consectetur velit laborum qui id cupidatat deserunt officia occaecat.Et incididunt est commodo minim dolor id nostrud.Consectetur reprehenderit tempor irure sit qui pariatur Lorem anim sint laborum consectetur culpa laboris anim.Duis magna commodo laborum irure sint.Adipisicing tempor enim velit laboris.
        </Text>
      </Section>
    </Container>
  );
}
