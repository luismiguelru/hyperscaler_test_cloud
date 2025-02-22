/*
Copyright (c) 2024, Ingram Micro
All rights reserved.
*/
import {
  index,
  saveSettingsData,
  settings,
} from '@/pages';
import {
  getChart,
  getMarketplaces,
  getSettings,
  processCheckboxes,
  processMarketplaces,
  processSelectedMarketplaces,
  updateSettings,
} from '@/utils';
import {
  addEventListener,
  disableButton,
  enableButton,
  hideComponent,
  prepareChart,
  prepareMarketplaces,
  prepareMarketplacesWithSwitch,
  renderChart,
  renderMarketplaces,
  showComponent,
} from '@/components';


jest.mock('@/utils', () => ({
  getSettings: jest.fn(() => Promise.resolve({ })),
  getChart: jest.fn(() => Promise.resolve({})),
  getMarketplaces: jest.fn(() => Promise.resolve({ })),
  processMarketplaces: jest.fn(),
  updateSettings: jest.fn(() => Promise.resolve({ })),
  processSelectedMarketplaces: jest.fn(),
  processCheckboxes: jest.fn(),
}));

jest.mock('@/components', () => ({
  prepareChart: jest.fn(() => 'chart'),
  prepareMarketplaces: jest.fn(() => 'marketplaces'),
  renderChart: jest.fn(),
  renderMarketplaces: jest.fn(),
  showComponent: jest.fn(),
  hideComponent: jest.fn(),
  prepareMarketplacesWithSwitch: jest.fn(() => 'marketplaces'),
  enableButton: jest.fn(),
  addEventListener: jest.fn(),
  disableButton: jest.fn(),
}));

const app = {
  emit: jest.fn(),
};

describe('pages.js', () => {
  describe('index', () => {
    beforeAll(() => {
      document.body.innerHTML = `<div id="app">
        <main-card title="Distribution of active subscriptions per marketplace">
            <div class="main-container">
                <div id="chart">
                </div>
                <div>
                    <div class="list-wrapper">
                        <ul id="marketplaces" class="list">
                        </ul>
                    </div>
                </div>
            </div>
        </main-card>
    </div>`;
    });
    beforeEach(async () => {
      await index(app);
    });

    test('calls hide app', () => {
      expect(hideComponent).toHaveBeenCalledWith('app');
    });
    test('calls showLoader', () => {
      expect(showComponent).toHaveBeenCalledWith('loader');
    });
    test('calls getSettings', () => {
      expect(getSettings).toHaveBeenCalled();
    });
    test('calls getChart', () => {
      expect(getChart).toHaveBeenCalled();
    });
    test('calls prepareChart', () => {
      expect(prepareChart).toHaveBeenCalled();
    });
    test('calls prepareMarketplaces', () => {
      expect(prepareMarketplaces).toHaveBeenCalled();
    });
    test('calls hideLoader', () => {
      expect(hideComponent).toHaveBeenCalledWith('loader');
    });
    test('calls showApp', () => {
      expect(showComponent).toHaveBeenCalledWith('app');
    });
    test('calls renderChart', () => {
      expect(renderChart).toHaveBeenCalled();
    });
    test('calls renderMarketplaces', () => {
      expect(renderMarketplaces).toHaveBeenCalled();
    });
  });

  describe('settings', () => {
    beforeAll(() => {
      document.body.innerHTML = `<div id="app">
        <main-card title="Settings">
            <div class="main-container">
                <div id="settings">
                </div>
            </div>
            <button id="save" class="btn btn-primary">Save</button>
        </main-card>
    </div>`;
    });
    describe('app is not passed', () => {
      beforeEach(async () => {
        await settings();
      });
      test('does not execute', () => {
        expect(showComponent).not.toHaveBeenCalled();
      });
    });
    describe('on success', () => {
      beforeEach(async () => {
        await settings(app);
      });
      test('calls showLoader', () => {
        expect(showComponent).toHaveBeenCalledWith('loader');
      });
      test('calls hideApp', () => {
        expect(hideComponent).toHaveBeenCalledWith('app');
      });
      test('calls hideError', () => {
        expect(hideComponent).toHaveBeenCalledWith('error');
      });
      test('calls getMarketplaces', () => {
        expect(getMarketplaces).toHaveBeenCalled();
      });
      test('calls getSettings', () => {
        expect(getSettings).toHaveBeenCalled();
      });
      test('calls processMarketplaces', () => {
        expect(processMarketplaces).toHaveBeenCalled();
      });
      test('calls prepareMarketplacesWithSwitch', () => {
        expect(prepareMarketplacesWithSwitch).toHaveBeenCalled();
      });
      test('calls renderMarketplaces', () => {
        expect(renderMarketplaces).toHaveBeenCalled();
      });
      test('calls enableButton', () => {
        expect(enableButton).toHaveBeenCalledWith('save', 'Save');
      });
      test('calls addEventListener', () => {
        expect(addEventListener).toHaveBeenCalledWith('save', 'click', expect.any(Function));
      });
      test('calls showApp', () => {
        expect(showComponent).toHaveBeenCalledWith('app');
      });
      test('does not call app.emit error ', () => {
        expect(app.emit).not.toHaveBeenCalled();
      });
      test('does not call showError', () => {
        expect(showComponent).not.toHaveBeenCalledWith('error');
      });
      test('calls hideLoader', () => {
        expect(hideComponent).toHaveBeenCalledWith('loader');
      });
    });
    describe('on error', () => {
      beforeEach(async () => {
        getMarketplaces.mockImplementationOnce(() => Promise.reject());
        await settings(app);
      });
      test('calls showLoader', () => {
        expect(showComponent).toHaveBeenCalledWith('loader');
      });
      test('calls hideApp', () => {
        expect(hideComponent).toHaveBeenCalledWith('app');
      });
      test('calls hideError', () => {
        expect(hideComponent).toHaveBeenCalledWith('error');
      });
      test('calls getMarketplaces', () => {
        expect(getMarketplaces).toHaveBeenCalled();
      });
      test('does not call getSettings', () => {
        expect(getSettings).not.toHaveBeenCalled();
      });
      test('does not call processMarketplaces', () => {
        expect(processMarketplaces).not.toHaveBeenCalled();
      });
      test('does not call prepareMarketplacesWithSwitch', () => {
        expect(prepareMarketplacesWithSwitch).not.toHaveBeenCalled();
      });
      test('does not call renderMarketplaces', () => {
        expect(renderMarketplaces).not.toHaveBeenCalled();
      });
      test('does not call enableButton', () => {
        expect(enableButton).not.toHaveBeenCalled();
      });
      test('does not call addEventListener', () => {
        expect(addEventListener).not.toHaveBeenCalled();
      });
      test('doe not call showApp', () => {
        expect(showComponent).not.toHaveBeenCalledWith('app');
      });
      test('calls app.emit error', () => {
        expect(app.emit).toHaveBeenCalledWith('snackbar:error', undefined);
      });
      test('calls showError', () => {
        expect(showComponent).toHaveBeenCalledWith('error');
      });
    });
  });

  describe('saveSettingsData', () => {
    describe('app is not passed', () => {
      beforeEach(async () => {
        await saveSettingsData();
      });
      test('does not execute', () => {
        expect(disableButton).not.toHaveBeenCalled();
      });
    });
    describe('on success', () => {
      beforeEach(async () => {
        await saveSettingsData(app);
      });

      test('calls disableButton', () => {
        expect(disableButton).toHaveBeenCalled();
      });
      test('calls getMarketplaces', () => {
        expect(getMarketplaces).toHaveBeenCalled();
      });
      test('calls processCheckboxes', () => {
        expect(processCheckboxes).toHaveBeenCalled();
      });
      test('calls processSelectedMarketplaces', () => {
        expect(processSelectedMarketplaces).toHaveBeenCalled();
      });
      test('calls updateSettings', () => {
        expect(updateSettings).toHaveBeenCalled();
      });
      test('calls app.emit message', () => {
        expect(app.emit).toHaveBeenCalledWith('snackbar:message', 'Settings saved');
      });
      test('calls enableButton', () => {
        expect(enableButton).toHaveBeenCalled();
      });
    });
    describe('on error', () => {
      beforeEach(async () => {
        getMarketplaces.mockImplementationOnce(() => Promise.reject());
        await saveSettingsData(app);
      });

      test('calls disableButton', () => {
        expect(disableButton).toHaveBeenCalled();
      });
      test('calls getMarketplaces', () => {
        expect(getMarketplaces).toHaveBeenCalled();
      });
      test('does not call processCheckboxes', () => {
        expect(processCheckboxes).not.toHaveBeenCalled();
      });
      test('does not call processSelectedMarketplaces', () => {
        expect(processSelectedMarketplaces).not.toHaveBeenCalled();
      });
      test('does not call updateSettings', () => {
        expect(updateSettings).not.toHaveBeenCalled();
      });
      test('calls app.emit error', () => {
        expect(app.emit).toHaveBeenCalledWith('snackbar:error', undefined);
      });
      test('calls enableButton', () => {
        expect(enableButton).toHaveBeenCalled();
      });
    });
  });
});
