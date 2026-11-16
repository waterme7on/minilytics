import { describe, expect, it } from 'vitest';
import { DEFAULT_TREND_METRICS, MAX_TREND_METRICS, TREND_METRICS, toggleTrendMetric } from '../src/dashboard/lib/trendMetrics';

describe('shared website trend metrics', () => {
  it('defaults to visitors, pageviews, impressions and session time', () => {
    expect(DEFAULT_TREND_METRICS).toEqual(['visitors', 'pageviews', 'impressions', 'avgDuration']);
    expect(MAX_TREND_METRICS).toBe(4);
  });

  it('offers sessions, session time and revenue beyond the default selection', () => {
    expect(TREND_METRICS.map((metric) => metric.value))
      .toEqual(['visitors', 'pageviews', 'sessions', 'impressions', 'avgDuration', 'revenue']);
  });

  it('blocks a fifth metric without dropping another', () => {
    expect(toggleTrendMetric(DEFAULT_TREND_METRICS, 'sessions')).toEqual(DEFAULT_TREND_METRICS);
  });

  it('allows a swap after unchecking one metric', () => {
    const three = toggleTrendMetric(DEFAULT_TREND_METRICS, 'avgDuration');
    expect(three).toEqual(['visitors', 'pageviews', 'impressions']);
    expect(toggleTrendMetric(three, 'sessions')).toEqual(['visitors', 'pageviews', 'impressions', 'sessions']);
  });

  it('keeps at least one selected metric', () => {
    expect(toggleTrendMetric(['sessions'], 'sessions')).toEqual(['sessions']);
  });
});
