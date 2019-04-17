function AddListener(state: any, change: object, resultSum: string, id: number){
    var listener = state[resultSum+"Listener"];
    if (listener === undefined) {
      change[resultSum+"Listener"] = [id];
    }
    else if (!listener.includes(id)) {
      listener.push(id);
    }    
  }

  export default AddListener