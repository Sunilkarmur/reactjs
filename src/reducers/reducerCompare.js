
let initState = {
    list:[]
};

export default function (state = initState, action) {
    
    switch (action.type) {
  
      case 'ADD_TO_COMPARE':
          return {...state,list:action.productInfo}
  
      default: {
          return state;
      }
  
  
  }
  }