import React from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Timer, { TimerProps } from '../components/Timer.tsx';
/*
potential tests:
1. a <Timer/> component is created
2. input is in minute an seconds
3. The timer starts 
4. The timer stops at that time
5. The timer cannot have 0 minute or 0 seconds
6. The times cannot have negetive minute or seconds simlutaneously
7. Displays the time correctly
*/

describe('the first set of basic timer tests', () => {
  it('A Timer Component is created', () => {
    const component = render(
      <Timer
        minutes={1}
        seconds={0}
        onEnd={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(component).toBeDefined();
  });

  it('throws an error if both minutes and seconds are 0', () => {
    vi.useFakeTimers();
    render(
      <Timer
        minutes={0}
        seconds={10}
        onEnd={function (): void {
          throw new Error(
            'Timer cannot have both minutes and seconds set to 0'
          );
        }}
      />
    );
    vi.advanceTimersByTime(10000);
    expect(() => {
      render(<Timer minutes={0} seconds={0} onEnd={() => {}} />);
    }).toThrow('Timer cannot have both minutes and seconds set to 0');
  });

  it('throws an error if both minutes and seconds are negative', () => {
    expect(() => {
      render(
        <Timer
          minutes={-1}
          seconds={-1}
          onEnd={function (): void {
            throw new Error(
              'Timer cannot have both minutes and seconds set to negative values'
            );
          }}
        />
      );
    }).toThrow(
      'Timer cannot have both minutes and seconds set to negative values'
    );
  });

  it('displays the initial time correctly', () => {
    render(<Timer minutes={1} seconds={30} onEnd={() => {}} />);
    expect(screen.getByText('00:00:01:30')).toBeInTheDocument();
  });

  it('counts down the time correctly', () => {
    vi.useFakeTimers();
    render(<Timer minutes={0} seconds={10} onEnd={() => {}} />);
    vi.advanceTimersByTime(1000);
    expect(screen.getByText('00:09')).toBeInTheDocument();
  });

  it('calls the callback function when the timer ends', () => {
    vi.useFakeTimers();
    const onEnd = vi.fn();
    render(<Timer minutes={0} seconds={1} onEnd={onEnd} />);
    vi.advanceTimersByTime(1000); // Advance time by 1 second
    expect(onEnd).toHaveBeenCalled();
  });

  it('stops the timer when unmounted', () => {
    vi.useFakeTimers();
    const { unmount } = render(
      <Timer minutes={0} seconds={10} onEnd={() => {}} />
    );
    unmount();
    vi.advanceTimersByTime(10000);
    expect(screen.queryByText('00:00')).not.toBeInTheDocument();
  });
});
