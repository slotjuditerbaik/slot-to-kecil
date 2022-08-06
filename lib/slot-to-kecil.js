'use babel';

import SlotToKecilView from './slot-to-kecil-view';
import { CompositeDisposable } from 'atom';

export default {

  slotToKecilView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotToKecilView = new SlotToKecilView(state.slotToKecilViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotToKecilView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-to-kecil:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotToKecilView.destroy();
  },

  serialize() {
    return {
      slotToKecilViewState: this.slotToKecilView.serialize()
    };
  },

  toggle() {
    console.log('SlotToKecil was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
