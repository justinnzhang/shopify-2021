import React from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';

// Shopify Polaris Components
import { Button, Page, Layout, EmptyState, Banner } from '@shopify/polaris';

// Custom animation components
import FadeUpParent from '../animation/FadeUpParent';
import FadeUpChildren from '../animation/FadeUpChildren';

// React router function
import { NavigateTo } from '../components/RouterNavigation';

const Landing = () => {
  const history = useHistory();

  return (
    <Page>
      <Banner
        status='warning'
        title='READ ME'
        action={{
          content: 'View API',
          url: 'http://www.omdbapi.com/',
          external: true,
        }}
      >
        <p>
          Hi there! I have stopped paying for the API that was powering the
          movie search function within this application - it is not working
          properly anymore!
        </p>
      </Banner>
      <FadeUpParent delayed keyPass='Landing FadeUp Parent'>
        <Layout>
          <Layout.Section>
            <EmptyState
              heading='The Shoppies: Movie awards for entrepreneurs'
              image='https://doixzan7hf4ti.cloudfront.net/shopify-2021-challenge/Landing-Illustration.svg'
            >
              <FadeUpChildren keyPass='Landing Body Text'>
                <p style={{ marginBottom: '16px', marginTop: '16px' }}>
                  Nominate your favourite movies of the year, hosted by Shopify
                </p>
              </FadeUpChildren>
              <FadeUpChildren keyPass='Landing Primary Button'>
                <Button primary onClick={() => NavigateTo('/search', history)}>
                  Get started
                </Button>
              </FadeUpChildren>
            </EmptyState>
          </Layout.Section>
        </Layout>
      </FadeUpParent>
    </Page>
  );
};

export default Landing;
