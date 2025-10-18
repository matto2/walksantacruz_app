/**
 * Content validation utilities for timeline entries
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface TimelineEntry {
  title: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
}

/**
 * Validate coordinate bounds (Santa Cruz area)
 */
export function isValidCoordinate(lat: number, lng: number): boolean {
  // Santa Cruz county approximate bounds
  const SANTA_CRUZ_BOUNDS = {
    minLat: 36.9,
    maxLat: 37.3,
    minLng: -122.3,
    maxLng: -121.7
  };

  return (
    lat >= SANTA_CRUZ_BOUNDS.minLat &&
    lat <= SANTA_CRUZ_BOUNDS.maxLat &&
    lng >= SANTA_CRUZ_BOUNDS.minLng &&
    lng <= SANTA_CRUZ_BOUNDS.maxLng
  );
}

/**
 * Validate date format (YYYY or YYYY-MM-DD)
 */
export function isValidDate(date: string): boolean {
  // Accept YYYY format
  if (/^\d{4}$/.test(date)) {
    const year = parseInt(date, 10);
    return year >= 1700 && year <= new Date().getFullYear();
  }

  // Accept YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
  }

  return false;
}

/**
 * Validate a timeline entry
 */
export function validateEntry(entry: TimelineEntry): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  if (!entry.title || entry.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!entry.date) {
    errors.push('Date is required');
  } else if (!isValidDate(entry.date)) {
    errors.push(`Invalid date format: ${entry.date}. Use YYYY or YYYY-MM-DD`);
  }

  if (!entry.location || entry.location.trim().length === 0) {
    errors.push('Location is required');
  }

  if (!entry.description || entry.description.trim().length === 0) {
    errors.push('Description is required');
  }

  // Coordinate validation
  if (typeof entry.latitude !== 'number' || typeof entry.longitude !== 'number') {
    errors.push('Latitude and longitude must be numbers');
  } else if (!isValidCoordinate(entry.latitude, entry.longitude)) {
    warnings.push(
      `Coordinates (${entry.latitude}, ${entry.longitude}) are outside Santa Cruz area. ` +
      'Please verify they are correct.'
    );
  }

  // Length validation
  if (entry.title && entry.title.length > 200) {
    warnings.push('Title is very long (>200 characters)');
  }

  if (entry.description && entry.description.length < 20) {
    warnings.push('Description is very short (<20 characters)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate all entries and return summary
 */
export function validateEntries(entries: TimelineEntry[]): {
  totalEntries: number;
  validEntries: number;
  invalidEntries: number;
  entriesWithWarnings: number;
  details: Array<{ entry: TimelineEntry; result: ValidationResult }>;
} {
  const details = entries.map(entry => ({
    entry,
    result: validateEntry(entry)
  }));

  return {
    totalEntries: entries.length,
    validEntries: details.filter(d => d.result.isValid).length,
    invalidEntries: details.filter(d => !d.result.isValid).length,
    entriesWithWarnings: details.filter(d => d.result.warnings.length > 0).length,
    details
  };
}
