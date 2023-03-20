import { findRealDom, twoVnode } from './react-dom'

export const syncUpdate = {
  isSyncBatch: false,
  updateQueue: [],
  batchUpdate: () => {
    syncUpdate.updateQueue.forEach((update)=>{
      update.updateComponent()
    })
    syncUpdate.updateQueue.length = 0;
    syncUpdate.isSyncBatch = false;
  }
}

class Update{
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.stateQueue = [];
  }

  addState(newProps) {
    this.stateQueue.push(newProps);

    this.emitUpdate();
  }

  emitUpdate() {
    if(syncUpdate.isSyncBatch) {
      syncUpdate.updateQueue.push(this);
    } else {
      this.updateComponent();
    }
  }

  updateComponent() {
    if(this.stateQueue.length > 0) {
      shouldUpdate(this.classInstance, this.getNowState());
    }
  }

  getNowState() {
    const {classInstance, stateQueue} = this;
    let {state} = classInstance;
    if(stateQueue.length > 0) {
      stateQueue.forEach((item) => {
        state = {...state,...item};
      })

      stateQueue.length = 0;
    }
    return state;
  }  
}

function shouldUpdate(classInstance, newState) {
  classInstance.state = newState;

  classInstance.forceUpdate();
}

class Component {
  static isClassComponent = true;

  constructor(props) {
    this.state = {};
    this.update = new Update(this);
  }

  setState(newProps) {
    this.update.addState(newProps);
  }

  forceUpdate() {
    let newVnode = this.render();
    let oldVnode = this.oldRenderVnode;

    let realDom = findRealDom(oldVnode);

    twoVnode(realDom.parentNode,newVnode,oldVnode);
    this.oldRenderVnode = newVnode;
  }
}

export default Component;