export default class NotificationMessage {
  static notificationDisplayed

  constructor(title, { type, duration } = {}) {
    this.element = null
    this.title = title
    this.type = type
    this.duration = duration

    if (NotificationMessage.notificationDisplayed) {
      NotificationMessage.notificationDisplayed.remove()
    }

    this.render()
  }

  render() {
    const element = document.createElement('div')
    element.className = this.type

    const durationInSeconds = this.duration / 1000
    
    element.innerHTML = `
      <div class="notification ${this.type}" style="--value:${durationInSeconds}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">Notification</div>
          <div class="notification-body">
            ${this.title}
          </div>
        </div>
      </div>
    `

    this.element = element
  }

  show(domElement = document.body) {
    NotificationMessage.notificationDisplayed = this.element

    domElement.append(this.element)
    setTimeout(() => { this.remove() }, this.duration)
  }

  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove()
    NotificationMessage.notificationDisplayed = null
  }
 }
