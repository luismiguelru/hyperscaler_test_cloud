/*
Copyright (c) 2024, Ingram Micro
All rights reserved.
*/
import {
  getChart,
  getMarketplaces,
  getSettings,
  processCheckboxes,
  processMarketplaces,
  processSelectedMarketplaces,
  updateSettings,
} from '../src/utils';


global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
}));


describe('utils.js API calls', () => {
  describe('getSettings', () => {
    test('returns settings', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ someKey: 'someValue' }),
      }));
      const result = await getSettings();
      expect(result).toEqual({ someKey: 'someValue' });
    });

    test('returns error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('error')));
      try { await getSettings(); } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });

  describe('getChart', () => {
    test('returns chart', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ someKey: 'someValue' }),
      }));
      const result = await getChart();
      expect(result).toEqual({ someKey: 'someValue' });
    });

    test('returns error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('error')));
      try { await getChart(); } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });

  describe('getMarketplaces', () => {
    test('returns marketplaces', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ someKey: 'someValue' }),
      }));
      const result = await getMarketplaces();
      expect(result).toEqual({ someKey: 'someValue' });
    });

    test('returns error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('error')));
      try { await getMarketplaces(); } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });

  describe('updateSettings', () => {
    test('returns settings', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ someKey: 'someValue' }),
      }));
      const result = await updateSettings({ someKey: 'someValue' });
      expect(fetch).toHaveBeenCalledWith('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ someKey: 'someValue' }),
      });
      expect(result).toEqual({ someKey: 'someValue' });
    });

    test('returns error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('error')));
      try { await updateSettings({ someKey: 'someValue' }); } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });
});

describe('utils.js data processing', () => {
  describe('processMarketplaces', () => {
    test('returns marketplaces', () => {
      const allMarketplaces = [
        { id: 1, name: 'Marketplace 1' },
        { id: 2, name: 'Marketplace 2' },
      ];
      const selectedMarketplaces = [
        { id: 1, name: 'Marketplace 1' },
      ];
      const result = processMarketplaces(allMarketplaces, selectedMarketplaces);
      expect(result).toEqual([
        {
          id: 1, name: 'Marketplace 1', checked: true,
        },
        {
          id: 2, name: 'Marketplace 2', checked: false,
        },
      ]);
    });
  });
  describe('processSelectedMarketplaces', () => {
    test('returns marketplaces', () => {
      const allMarketplaces = [
        { id: 1, name: 'Marketplace 1' },
        { id: 2, name: 'Marketplace 2' },
      ];
      const checkboxes = [
        { value: 1 },
      ];
      const result = processSelectedMarketplaces(allMarketplaces, checkboxes);
      expect(result).toEqual([
        { id: 1, name: 'Marketplace 1' },
      ]);
    });
  });
  describe('processCheckboxes', () => {
    test('returns checkboxes', () => {
      const marketplaces = [
        {
          id: 1, name: 'Marketplace 1', checked: true,
        },
        {
          id: 2, name: 'Marketplace 2', checked: false,
        },
      ];
      const result = processCheckboxes(marketplaces);
      expect(result).toEqual([{
        id: 1, name: 'Marketplace 1', checked: true,
      }]);
    });
  });
});
