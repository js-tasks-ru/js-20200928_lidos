export default class SortableTable {
  element;
  subElements = {};

  constructor(header, { data }) {
    this.header = header
    this.data = data

    this.render()
  }
  
  renderTableHeader() {
   return (
    `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.header.map(item => this.renderHeaderRow(item)).join('')}
      </div>
    `
   )
  }

  renderSortingArrow() {
    return(
      `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      `
    )
  }

  renderHeaderRow(item) {
    return(
      `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>
        ${this.renderSortingArrow()}
      </div>`
    )
  }

  renderTableBody() {
    return (
      `<div data-element="body" class="sortable-table__body">${this.renderTableRow(this.data)}</div>`
    )
  }

  renderTableRow(data) {
    return (
      data.map(row => `<a href="/products/${row.id}" class="sortable-table__row">${this.renderTableCell(row)}</a>`).join('')
    )
  }

  renderTableCell(row) {
    return(
      this.header.map(({ id, template }) => (template ? template(row.images) : `<div class="sortable-table__cell">${row[id]}</div>`)).join('')
    )
  }

  renderTable() {
    return(
      `<div class="sortable-table">
        ${this.renderTableHeader()}
        ${this.renderTableBody()}
      </div>`
    )
  }

  sortedTableData(field, order) {
    const newArray = [...this.data]
    const orderType = order === 'desc' ? -1 : 1
    const { sortType } = this.header.find(element => element.id === field)

    return(
      newArray.sort((a, b) => {
        switch (sortType) {
          case 'number': 
            return (a[field] - b[field]) * orderType
          case 'string':
            return (a[field].localeCompare(b[field], 'ru')) * orderType
          default:
            return (a[field] - b[field]) * orderType
        }
      })
    )
  }

  sort(field, order) {
    const sorted = this.sortedTableData(field, order)

    this.subElements.body.innerHTML = this.renderTableRow(sorted)
  }

  render() {
    const element = document.createElement('div')

    element.innerHTML = this.renderTable()

    this.element = element

    this.subElements.body = element.querySelector('.sortable-table__body')
  }

  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove()
    this.subElements = {}
  }
}

