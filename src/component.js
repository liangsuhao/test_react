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

  emitUpdate(newProps) {
    this.nextProps = newProps;
    if(syncUpdate.isSyncBatch) {
      syncUpdate.updateQueue.push(this);
    } else {
      this.updateComponent();
    }
  }

  updateComponent() {
    if(this.nextProps || this.stateQueue.length > 0) {
      shouldUpdate(this.classInstance, this.getNowState(), this.classInstance.props);
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

function shouldUpdate(classInstance, newState, nextProps) {
  let willUpdate = true;
  classInstance.state = newState;

  if(nextProps) {
    classInstance.props = nextProps;
  }

  if(willUpdate && classInstance.shouldComponentUpdate) {
    willUpdate = classInstance.shouldComponentUpdate(nextProps,newState)===true ? true : false;
  }

  if(willUpdate) {
    if(classInstance.componentWillUpdate) {
      classInstance.componentWillUpdate();
    }
    classInstance.forceUpdate();
    if(classInstance.componentDidUpdate) {
      classInstance.componentDidUpdate();
    }
  }
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
    if(this.constructor.getDerivedStateFromProps) {
      let newState = this.constructor.getDerivedStateFromProps(this.props, this.state);
      this.state = {...this.state, ...newState};
    }
    let newVnode = this.render();
    let oldVnode = this.oldRenderVnode;

    let realDom = findRealDom(oldVnode);

    twoVnode(realDom.parentNode,newVnode,oldVnode);
    this.oldRenderVnode = newVnode;
  }
}

export default Component;