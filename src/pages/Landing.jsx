import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

// Shopify Polaris Components
import { Button, Page, Layout, EmptyState } from '@shopify/polaris';

// Custom animation components
import FadeUpParent from '../animation/FadeUpParent';
import FadeUpChildren from '../animation/FadeUpChildren';

const Landing = () => {
  return (
    <Page>
      <FadeUpParent delayed keyPass='Landing FadeUp Parent'>
        <Layout>
          <Layout.Section>
            <EmptyState
              heading='The Shoppies: Movie awards for entrepreneurs'
              image='https://doixzan7hf4ti.cloudfront.net/shopify-2021-challenge/Landing-Illustration.svg'
            >
              <FadeUpChildren keyPass='Landing Body Text'>
                <p style={{ marginBottom: '20px' }}>
                  Nominate your favourite movies of the year, hosted by Shopify
                </p>
              </FadeUpChildren>
              <FadeUpChildren keyPass='Landing Primary Button'>
                <Button primary url='/search'>
                  Get started
                </Button>
              </FadeUpChildren>
            </EmptyState>
          </Layout.Section>
          <Layout.Section></Layout.Section>
        </Layout>
      </FadeUpParent>
    </Page>
  );
};

export default Landing;
