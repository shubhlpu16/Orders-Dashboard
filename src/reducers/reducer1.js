export const DEFAULT_STORE = {
  orders: [],
};

export const ACTION_TYPES = {
  addStore: 'addStore',
};

export default function storeAdd(state = DEFAULT_STORE, action) {
  switch (action.type) {
    case ACTION_TYPES.addStore: {
      const data = {
        orders: [...state.orders, ...action.payload.storeData],
      };
      return data;
    }

    default:
      return state;
  }
}
