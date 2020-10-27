export default class ColumnChart {
  element;
  subElements = {};

  constructor(options = {}) {
    this.options = options;
    this.chartHeight = 50;

    this.render();
    this.fetchData()
  }

  formatData(from, to) {
    if (!from && !to) return "";

    return {
      from: from.toISOString(),
      to: to.toISOString(),
    };
  }

  async fetchData(updateRange) {
    const { url } = this.options;
    const coreURL = "https://course-js.javascript.ru";
    const range = updateRange || this.options.range;

    const query = this.formatData(range?.from, range?.to);

    try {
      const response = await fetch(
        `${coreURL}/${url}?` + new URLSearchParams(query)
      );
      const result = await response.json();

      if (result && Object.values(result).length) {
        this.subElements.body.innerHTML = this.getChart(Object.values(result));
  
        this.element.classList.remove('column-chart_loading');
      }
    } catch(err) {
    }
  }

  getChart(data) {
    if (!data) return
    
    const maxValue = Math.max.apply(null, data);
    const coef = this.chartHeight / maxValue;

    return (data.map(
      (item) =>
        `<div style="--value: ${Math.floor(
          item * coef
        )}" data-tooltip="${Math.round((item * 100) / maxValue)}%"></div>`
    )
    .join(""))
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  showLink() {
    return this.options.link
    ? `<a class="column-chart__link" href="${this.options.link}">View all</a>`
    : "";
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.options.label}
          ${this.showLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header"></div>
          <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>
    `;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  async update(from, to) {
    await this.fetchData({ from, to })
  } 

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
