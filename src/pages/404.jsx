import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../App.css';

// Shopify Polaris Components
import {
  Page,
  Layout,
  EmptyState,
  Image,
  TextStyle,
  DisplayText,
  TextContainer,
} from '@shopify/polaris';

// Custom animation components
import FadeUpParent from '../animation/FadeUpParent';
import FadeUpChildren from '../animation/FadeUpChildren';
import { floatingLoop } from '../animation/Variants';

// React router function
import { NavigateTo } from '../components/RouterNavigation';

const NotFound = () => {
  const history = useHistory();

  return (
    <Page>
      <FadeUpParent delayed keyPass='Landing FadeUp Parent'>
        <Layout>
          <Layout.Section>
            <EmptyState
              action={{
                content: 'Back home',
                onAction: () => NavigateTo('/', history),
              }}
              image='https://doixzan7hf4ti.cloudfront.net/shopify-2021-challenge/404-page.svg'
              fullWidth
            >
              <motion.div variants={floatingLoop}>
                <DisplayText size='extraLarge'>?</DisplayText>
              </motion.div>
              <TextContainer>
                <DisplayText size='large'>
                  Uh oh, something went wrong
                </DisplayText>
                <TextStyle variation='code'>404 Not Found</TextStyle>
              </TextContainer>
            </EmptyState>

            <Image src='' />
          </Layout.Section>
        </Layout>
      </FadeUpParent>
    </Page>
  );
};

export default NotFound;
