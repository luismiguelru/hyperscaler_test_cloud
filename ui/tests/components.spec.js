/*
Copyright (c) 2024, Ingram Micro
All rights reserved.
*/
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


describe('components.js', () => {
  describe('prepareMarketplaces', () => {
    test('returns "" if marketplaces is empty', () => {
      const result = prepareMarketplaces([]);
      expect(result).toBe('');
    });

    test('returns "" if marketplaces is not array', () => {
      const result = prepareMarketplaces({});
      expect(result).toBe('');
    });

    test('returns a list of marketplaces', () => {
      const result = prepareMarketplaces([{
        icon: 'icon', id: 'id', name: 'name', description: 'description',
      }]);
      expect(result).toBe(`<li class="list-item">
        <div class="list-item-image">
          <img src="icon" alt="Thumbnail">
        </div>
        <div class="list-item-content">
          <h4>id - name</h4>
          <p>description</p>
        </div>
      </li>`);
    });
  });

  describe('prepareMarketplacesWithSwitch', () => {
    test('returns "" if marketplaces is empty', () => {
      const result = prepareMarketplacesWithSwitch([]);
      expect(result).toBe('');
    });
    test('returns "" if marketplaces is not array', () => {
      const result = prepareMarketplacesWithSwitch({});
      expect(result).toBe('');
    });
    test.each([[`<li class="list-item">
        <div class="list-item-image">
          <img src="icon" alt="Thumbnail">
        </div>
        <div class="list-item-content">
          <h4>name</h4>
          <p>description</p>
        </div>
        <div class="list-item switch">
          <label class="switch">
              <input type="checkbox" role="switch" value="id" checked>
              <span></span>
          </label>
        </div>
      </li>`, {
      icon: 'icon', id: 'id', name: 'name', description: 'description', checked: true,
    }],
    [`<li class="list-item">
        <div class="list-item-image">
          <img src="icon2" alt="Thumbnail">
        </div>
        <div class="list-item-content">
          <h4>name2</h4>
          <p>description2</p>
        </div>
        <div class="list-item switch">
          <label class="switch">
              <input type="checkbox" role="switch" value="id2">
              <span></span>
          </label>
        </div>
      </li>`, {
      icon: 'icon2', id: 'id2', name: 'name2', description: 'description2', checked: false,
    }]])('returns a list of marketplaces with switch', (expected, marketplace) => {
      const result = prepareMarketplacesWithSwitch([marketplace]);
      expect(result).toBe(expected);
    });
  });

  describe('prepareChart', () => {
    test('returns a chart', () => {
      const result = prepareChart({ type: 'bar' });
      expect(result).toBe('<img src="https://quickchart.io/chart?c=%7B%22type%22:%22bar%22%7D">');
    });
  });

  describe('renderChart', () => {
    test('renders a chart', () => {
      document.body.innerHTML = '<div id="chart"></div>';
      renderChart('<img src="/a.jpg">');
      expect(document.getElementById('chart').innerHTML).toBe('<img src="/a.jpg">');
    });
  });

  describe('renderMarketplaces', () => {
    test('renders a list of marketplaces', () => {
      document.body.innerHTML = '<div id="marketplaces"></div>';
      renderMarketplaces('<li>item</li>');
      expect(document.getElementById('marketplaces').innerHTML).toBe('<li>item</li>');
    });
  });

  describe('enableButton', () => {
    beforeEach(() => {
      document.body.innerHTML = '<button id="button" disabled></button>';
    });
    test('enables a button', () => {
      enableButton('button');
      expect(document.getElementById('button').disabled).toBe(false);
    });
    test('enables a button with a custom message', () => {
      enableButton('button', 'custom message');
      expect(document.getElementById('button').disabled).toBe(false);
      expect(document.getElementById('button').innerText).toBe('custom message');
    });
  });

  describe('disableButton', () => {
    beforeEach(() => {
      document.body.innerHTML = '<button id="button"></button>';
    });
    test('disables a button', () => {
      disableButton('button');
      expect(document.getElementById('button').disabled).toBe(true);
    });
    test('disables a button with a custom message', () => {
      disableButton('button', 'custom message');
      expect(document.getElementById('button').disabled).toBe(true);
      expect(document.getElementById('button').innerText).toBe('custom message');
    });
  });

  describe('addEventListener', () => {
    test('adds an event listener', () => {
      document.body.innerHTML = '<button id="button"></button>';
      const callback = jest.fn();
      addEventListener('button', 'click', callback);
      document.getElementById('button').click();
      expect(callback).toBeCalled();
    });
  });

  describe('showLoader', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="loader" class="hidden"></div>';
      showComponent('loader');
    });
    it('shows a loader', () => {
      expect(document.getElementById('loader').classList.contains('hidden')).toBe(false);
    });
  });

  describe('showComponent without passing id', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="component" class="hidden"></div>';
      showComponent();
    });
    it('does not show a component', () => {
      expect(document.getElementById('component').classList.contains('hidden')).toBe(true);
    });
  });

  describe('hideLoader', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="loader"></div>';
      hideComponent('loader');
    });
    it('hides a loader', () => {
      expect(document.getElementById('loader').classList.contains('hidden')).toBe(true);
    });
  });

  describe('hideComponent without passing id', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="component"></div>';
      hideComponent();
    });
    it('does not hide a component', () => {
      expect(document.getElementById('component').classList.contains('hidden')).toBe(false);
    });
  });
});
