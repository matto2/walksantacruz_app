import { describe, it, expect } from 'vitest';
import {
  isValidCoordinate,
  isValidDate,
  validateEntry,
  validateEntries,
  type TimelineEntry
} from './contentValidator';

describe('isValidCoordinate', () => {
  it('should accept valid Santa Cruz coordinates', () => {
    expect(isValidCoordinate(36.9741, -122.0308)).toBe(true);
    expect(isValidCoordinate(37.0, -122.0)).toBe(true);
  });

  it('should reject coordinates outside Santa Cruz', () => {
    expect(isValidCoordinate(40.7128, -74.0060)).toBe(false); // NYC
    expect(isValidCoordinate(0, 0)).toBe(false); // Null Island
  });

  it('should reject invalid coordinate bounds', () => {
    expect(isValidCoordinate(100, -200)).toBe(false);
    expect(isValidCoordinate(-100, 200)).toBe(false);
  });
});

describe('isValidDate', () => {
  it('should accept valid YYYY format', () => {
    expect(isValidDate('1877')).toBe(true);
    expect(isValidDate('2023')).toBe(true);
  });

  it('should accept valid YYYY-MM-DD format', () => {
    expect(isValidDate('1877-12-25')).toBe(true);
    expect(isValidDate('2023-01-01')).toBe(true);
  });

  it('should reject invalid date formats', () => {
    expect(isValidDate('invalid')).toBe(false);
    expect(isValidDate('12/25/1877')).toBe(false);
    expect(isValidDate('1877-13-01')).toBe(false); // Invalid month
  });

  it('should reject dates outside reasonable range', () => {
    expect(isValidDate('1600')).toBe(false); // Too old
    expect(isValidDate('3000')).toBe(false); // Too far in future
  });
});

describe('validateEntry', () => {
  const validEntry: TimelineEntry = {
    title: 'McCormick House',
    date: '1877-12-25',
    location: '241 Walnut Avenue',
    latitude: 36.9726,
    longitude: -122.0301,
    description: 'A beautiful Victorian cottage built as a Christmas gift.'
  };

  it('should validate a valid entry', () => {
    const result = validateEntry(validEntry);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should require a title', () => {
    const entry = { ...validEntry, title: '' };
    const result = validateEntry(entry);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Title is required');
  });

  it('should require a date', () => {
    const entry = { ...validEntry, date: '' };
    const result = validateEntry(entry);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Date is required');
  });

  it('should require valid date format', () => {
    const entry = { ...validEntry, date: 'invalid-date' };
    const result = validateEntry(entry);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should require a location', () => {
    const entry = { ...validEntry, location: '' };
    const result = validateEntry(entry);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Location is required');
  });

  it('should require a description', () => {
    const entry = { ...validEntry, description: '' };
    const result = validateEntry(entry);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Description is required');
  });

  it('should warn about coordinates outside Santa Cruz', () => {
    const entry = { ...validEntry, latitude: 40.7128, longitude: -74.0060 };
    const result = validateEntry(entry);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('should warn about very short descriptions', () => {
    const entry = { ...validEntry, description: 'Short' };
    const result = validateEntry(entry);
    expect(result.warnings.some(w => w.includes('short'))).toBe(true);
  });

  it('should warn about very long titles', () => {
    const entry = { ...validEntry, title: 'A'.repeat(250) };
    const result = validateEntry(entry);
    expect(result.warnings.some(w => w.includes('long'))).toBe(true);
  });
});

describe('validateEntries', () => {
  const validEntry: TimelineEntry = {
    title: 'Valid Entry',
    date: '1877',
    location: 'Santa Cruz',
    latitude: 36.9741,
    longitude: -122.0308,
    description: 'A valid historical entry'
  };

  const invalidEntry: TimelineEntry = {
    title: '',
    date: 'invalid',
    location: '',
    latitude: 0,
    longitude: 0,
    description: ''
  };

  it('should validate multiple entries', () => {
    const entries = [validEntry, invalidEntry];
    const result = validateEntries(entries);

    expect(result.totalEntries).toBe(2);
    expect(result.validEntries).toBe(1);
    expect(result.invalidEntries).toBe(1);
  });

  it('should return detailed results for each entry', () => {
    const entries = [validEntry, invalidEntry];
    const result = validateEntries(entries);

    expect(result.details).toHaveLength(2);
    expect(result.details[0].result.isValid).toBe(true);
    expect(result.details[1].result.isValid).toBe(false);
  });
});
