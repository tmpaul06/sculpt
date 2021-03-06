class PropertyPanelStore {
  setNotifyCallback(notifyCallback) {
    this.notifyCallback = notifyCallback;
  }

  show(componentId, props, componentType, coords, changeCallback) {
    if (this.notifyCallback) {
      this.notifyCallback(props, componentType, coords, (newProps) => {
        changeCallback(componentId, newProps);
      });
    }
  }
}

export default new PropertyPanelStore();
