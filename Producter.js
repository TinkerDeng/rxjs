/**
 * @author 邓凤存
 * @description 自定义一个观察者模式类
 */
class Producter {
  constructor() {
    this.listeners = [];
  }
  addListener(listener) {
    if (typeof listener !== 'function') {
      throw new Error('listener参数必须是function');
    }
    this.listeners.push(listener);
  }
  removeListener(listener) {
    if (!listener) {
      throw new Error('listener参数是必传项');
    }
    let currentListener = this.listeners.indexOf(listener);
    this.listeners.splice(currentListener, 1);
  }
  notify(...message) {
    this.listeners.forEach(listener => {
      listener(...message);
    });
  }
}
export default new Producter();
