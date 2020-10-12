export default class ColumnChart {
  element;

  constructor(props = {}) {
    this.props = props
    this.chartHeight = 50;
    this.render()
  }

  render() {
    const { label, link, value, data } = this.props
    const maxValue = Math.max.apply(null, data)
    const coef = this.chartHeight / maxValue

    const div = document.createElement('div')
    div.className = `column-chart ${data && data.length ? '' : 'column-chart_loading'}`
    div.setAttribute('style', `--chart-height: ${this.chartHeight}`)

    const showLink = link ? `<a class="column-chart__link" href="${link}">View all</a>` : ''

    const showChart = data && data.map(item => `<div style="--value: ${Math.floor(item*coef)}" data-tooltip="${Math.round((item * 100) / maxValue)}%"></div>`).join('')

    div.innerHTML = `
      <div class="column-chart__title">
        Total ${label}
        ${showLink}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
          ${value}
        </div>
        <div data-element="body" class="column-chart__chart">
          ${showChart}
        </div>
      </div>
    `
    this.element = div
  }

  update(data) {
    this.props.data = data
    this.render()
  }

  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove() 
  }
}
