import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';

// Shopify Polaris Components
import {
  AppProvider,
  Button,
  Page,
  Layout,
  Card,
  TextField,
  DisplayText,
  Form,
} from '@shopify/polaris';

import enTranslations from '@shopify/polaris/locales/en.json';

// Icons - React Icons
import { IconContext } from 'react-icons';
import { IoPerson } from 'react-icons/io5';

// Custom components & CSS
import Spacer from '../components/Spacer';

// Custom animation components
import FadeUpParent from '../animation/FadeUpParent';
import FadeUpChildren from '../animation/FadeUpChildren';
import AnimationTrigger from '../animation/AnimationTrigger';
import SummaryPosterAnimation from '../animation/SummaryPosterAnimation';

// React router function
import { NavigateTo } from '../components/RouterNavigation';

const Summary = () => {
  // Stores all nominated movies
  const [nominated, setNominated] = useState([]);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Text input functions
  const [value, setValue] = useState('');
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const handleClearButtonClick = useCallback(() => handleChange(''), []);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('nominated')) {
      setNominated(JSON.parse(localStorage.getItem('nominated')));
    }
  }, []);

  const handleNextStep = () => {
    if (value !== '') {
      setStep(step + 1);
    } else {
      setErrors({ noName: 'You have a name right?' });
    }
  };

  const handleRestart = () => {
    localStorage.removeItem('nominated');
    NavigateTo('/', history);
  };

  return (
    <AppProvider i18n={enTranslations}>
      <AnimatePresence exitBeforeEnter>
        <Page
          breadcrumbs={[
            {
              content: 'Movie Search',
              onAction: () => NavigateTo('/search', history),
            },
          ]}
          title='The Shoppies'
          separator
          subtitle='Summary'
          narrowWidth
        >
          {step === 1 && (
            <FadeUpParent keyPass='Summary Page Parent'>
              <Layout>
                <Layout.Section oneHalf>
                  <Card sectioned title='Enter your first name'>
                    <Form>
                      <TextField
                        placeholder='Whose nominations are these?'
                        value={value}
                        onChange={handleChange}
                        clearButton
                        onClearButtonClick={handleClearButtonClick}
                        prefix={
                          <IconContext.Provider
                            value={{
                              style: { verticalAlign: '-0.1em' },
                            }}
                          >
                            <IoPerson />
                          </IconContext.Provider>
                        }
                        autoFocus={true}
                        error={errors.noName}
                      />

                      <Spacer amount={10} />

                      <Button
                        primary
                        onClick={() => handleNextStep()}
                        submit={true}
                      >
                        Next
                      </Button>
                    </Form>
                  </Card>
                </Layout.Section>
              </Layout>
            </FadeUpParent>
          )}
          {step === 2 && (
            <>
              <FadeUpParent keyPass='Summary Page Parent 2'>
                <Layout>
                  <Layout.Section>
                    <FadeUpChildren>
                      <div style={{ padding: '2em' }}>
                        <DisplayText>{`These were your 5 movie nominations, ${value}`}</DisplayText>
                      </div>
                    </FadeUpChildren>
                  </Layout.Section>
                </Layout>
              </FadeUpParent>

              <Spacer />

              {nominated.map((element, index) => (
                <div key={`${element.id} - showcase`}>
                  <AnimationTrigger>
                    <SummaryPosterAnimation
                      left={index % 2 === 0 ? true : false}
                      poster={element.Poster}
                      title={element.Title}
                      year={element.Year}
                      index={index}
                    />
                    <Spacer />
                  </AnimationTrigger>
                </div>
              ))}

              <Spacer />

              <FadeUpParent keyPass='Summary Page Parent 3'>
                <Layout>
                  <Layout.Section>
                    <FadeUpChildren>
                      <Card title='Thank you for your submissions' sectioned>
                        <Button primary onClick={() => handleRestart()}>
                          Restart
                        </Button>
                      </Card>
                    </FadeUpChildren>
                  </Layout.Section>
                </Layout>
              </FadeUpParent>
            </>
          )}
        </Page>
      </AnimatePresence>
    </AppProvider>
  );
};

export default Summary;
