/*
Copyright (c) 2024, Ingram Micro
All rights reserved.
*/
// prepare UI components
export const prepareMarketplaces = (marketplaces) => {
  try {
    return marketplaces.reduce((list, marketplace) => `${list}<li class="list-item">
        <div class="list-item-image">
          <img src="${marketplace.icon}" alt="Thumbnail">
        </div>
        <div class="list-item-content">
          <h4>${marketplace.id} - ${marketplace.name}</h4>
          <p>${marketplace.description}</p>
        </div>
      </li>`, '');
  } catch (e) { return ''; }
};

export const prepareMarketplacesWithSwitch = (marketplaces) => {
  try {
    return marketplaces.reduce((list, marketplace) => `${list}<li class="list-item">
        <div class="list-item-image">
          <img src="${marketplace.icon}" alt="Thumbnail">
        </div>
        <div class="list-item-content">
          <h4>${marketplace.name}</h4>
          <p>${marketplace.description}</p>
        </div>
        <div class="list-item switch">
          <label class="switch">
              <input type="checkbox" role="switch" value="${marketplace.id}"${marketplace.checked ? ' checked' : ''}>
              <span></span>
          </label>
        </div>
      </li>`, '');
  } catch (e) { return ''; }
};

export const prepareChart = (chartData) => `<img src="https://quickchart.io/chart?c=${encodeURI(JSON.stringify(chartData))}">`;

// render UI components
export const renderMarketplaces = (marketplaces) => {
  const element = document.getElementById('marketplaces');
  element.innerHTML = marketplaces;
};

export const renderChart = (chart) => {
  const element = document.getElementById('chart');
  element.innerHTML = chart;
};

// render UI components - buttons
export const enableButton = (id, text) => {
  const element = document.getElementById(id);
  element.disabled = false;
  if (text) element.innerText = text;
};

export const disableButton = (id, text) => {
  const element = document.getElementById(id);
  element.disabled = true;
  if (text) element.innerText = text;
};

export const addEventListener = (id, event, callback) => {
  const element = document.getElementById(id);
  element.addEventListener(event, callback);
};

// render UI components - show/hide
export const showComponent = (id) => {
  if (!id) return;
  const element = document.getElementById(id);
  element.classList.remove('hidden');
};

export const hideComponent = (id) => {
  if (!id) return;
  const element = document.getElementById(id);
  element.classList.add('hidden');
};
