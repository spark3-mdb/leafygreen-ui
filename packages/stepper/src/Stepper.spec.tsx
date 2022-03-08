import React from 'react';
import { prettyDOM, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Stepper from '.';

const defaultProps = {
  currentStep: 0,
};

const StepContents = (n: number) => {
  return [...Array(n)].map((_, i) => <div key={`step-${i}`}>Step {i + 1}</div>);
};

describe('packages/stepper', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <Stepper {...defaultProps}>{StepContents(3)}</Stepper>,
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('basic rendering', () => {
    test('renders steps', async () => {
      const { getByText } = render(
        <Stepper {...defaultProps}>{StepContents(3)}</Stepper>,
      );

      expect(getByText('Step 1')).toBeInTheDocument();
      expect(getByText('Step 2')).toBeInTheDocument();
      expect(getByText('Step 3')).toBeInTheDocument();
    });

    test('renders correct default current step', async () => {
      const { container } = render(
        <Stepper {...defaultProps}>{StepContents(3)}</Stepper>,
      );
      const currentStep = container.querySelector('[aria-current="step"]');
      expect(currentStep).toContainHTML('Step 1');
      expect(currentStep).not.toContainHTML('Step 2');
      expect(currentStep).not.toContainHTML('Step 3');
    });
  });

  describe('props', () => {
    test('renders correct current step', async () => {
      const { container } = render(
        <Stepper {...defaultProps} currentStep={1}>
          {StepContents(3)}
        </Stepper>,
      );
      const currentStep = container.querySelector('[aria-current="step"]');
      expect(currentStep).not.toContainHTML('Step 1');
      expect(currentStep).toContainHTML('Step 2');
      expect(currentStep).not.toContainHTML('Step 3');
    });

    test('controls number of visible steps', async () => {
      const { queryByText } = render(
        <Stepper {...defaultProps} maxDisplayedSteps={2}>
          {StepContents(3)}
        </Stepper>,
      );

      expect(queryByText('Step 1')).toBeInTheDocument();
      expect(queryByText('Step 2')).not.toBeInTheDocument();
      expect(queryByText('Step 3')).not.toBeInTheDocument();
    });

    test('renders ellipsis steps', async () => {
      const { queryByText } = render(
        <Stepper {...defaultProps} maxDisplayedSteps={2}>
          {StepContents(3)}
        </Stepper>,
      );

      expect(queryByText('Steps 2 and 3')).toBeInTheDocument();
    });

    test('renders correct "and" ellipsis text', async () => {
      const shouldHaveAndText = render(
        <Stepper {...defaultProps} maxDisplayedSteps={2}>
          {StepContents(3)}
        </Stepper>,
      );

      expect(
        shouldHaveAndText.queryByText('Steps 2 and 3'),
      ).toBeInTheDocument();
    });

    test('renders correct "to" ellipsis text', async () => {
      const shouldHaveToText = render(
        <Stepper {...defaultProps} maxDisplayedSteps={2}>
          {StepContents(5)}
        </Stepper>,
      );

      expect(shouldHaveToText.queryByText('Steps 2 to 5')).toBeInTheDocument();
    });

    test('renders correct number of completed steps', async () => {
      const { queryByText } = render(
        <Stepper
          {...defaultProps}
          currentStep={3}
          maxDisplayedSteps={4}
          completedStepsShown={2}
        >
          {StepContents(5)}
        </Stepper>,
      );

      expect(queryByText('Steps 1 and 2')).toBeInTheDocument();
    });
  });
});
