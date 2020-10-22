export default class ColumnChart {
  element;
  subElements = {};

  constructor(options = {}) {
    this.options = options;
    this.chartHeight = 50;
    this.isLoading = false;

    Promise.resolve(this.fetchData()).then((data) => {
      this.options.data = data;
      this.render();
    });
  }

  formatData(from, to) {
    if (!from && !to) return "";

    return {
      from: from.toISOString(),
      to: to.toISOString(),
    };
  }

  async fetchData(updateRange) {
    this.isLoading = true;
    this.render();

    const { url } = this.options;
    const coreURL = "https://course-js.javascript.ru";
    const range = updateRange || this.options.range;

    const query = this.formatData(range?.from, range?.to);

    try {
      const response = await fetch(
        `${coreURL}/${url}?` + new URLSearchParams(query)
      );
      const result = await response.json();

      this.isLoading = Object.values(result).length ? false : true;

      return Object.values(result);
    } catch {
      this.isLoading = false;
    }
  }

  getChart() {
    const { label, link, value, data } = this.options;
    const maxValue = Math.max.apply(null, data);
    const coef = this.chartHeight / maxValue;

    const showLink = link
      ? `<a class="column-chart__link" href="${link}">View all</a>`
      : "";

    const showChart =
      data &&
      data
        .map(
          (item) =>
            `<div style="--value: ${Math.floor(
              item * coef
            )}" data-tooltip="${Math.round((item * 100) / maxValue)}%"></div>`
        )
        .join("");

    return `
      <div class="column-chart__title">
        Total ${label}
        ${showLink}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
          ${value || ""}
        </div>
        <div data-element="body" class="column-chart__chart">
          ${showChart}
        </div>
      </div>
    `;
  }

  createDOM() {
    const div =
      document.querySelector(
        `.dashboard__chart_${this.options.label} .column-chart`
      ) || document.createElement("div");

    div.classList.add("column-chart");

    if (this.isLoading) {
      div.classList.add("column-chart_loading");
    } else {
      div.classList.remove("column-chart_loading");
    }

    div.setAttribute("style", `--chart-height: ${this.chartHeight}`);

    return div;
  }

  render() {
    this.element = this.createDOM();
    this.element.innerHTML = this.getChart();

    this.subElements.body = this.element.querySelector('[data-element="body"]');

    this.subElements.innerHTML = this.getChart();
  }

  update(from, to) {
    Promise.resolve(this.fetchData({ from, to })).then((data) => {
      console.log(data);
      this.options.data = data;
      this.render();
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
