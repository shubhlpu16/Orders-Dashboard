import axios from 'axios';
import { ACTION_TYPES } from '../reducers/reducer1';
import {
  convertToDateFormat,
  getWeekStartDate,
  getMonthStartDate,
  getLastMonthDates,
} from '../utils/HelperMethods';

const addStore = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.addStore,
    payload: data,
  });
};

export const fetchData = (city) => async (dispatch) => {
  let url = 'https://shubh-orders-app.herokuapp.com/orders';
  if (city !== 'All') {
    url = `${url}?city=${city}`;
  }
  await axios
    .get(url)
    .then((response) => {
      dispatch(addStore({ storeData: response.data }));
    })
    .catch((err) => console.error(err));
};

const getCountAndAmount = (orders) => {
  let amount = 0;
  orders.forEach((order) => {
    amount += order.totalAmount;
  });

  return [orders.length, amount];
};

export const prepareSummary = (params) => {
  const { store } = params;
  const todayDate = convertToDateFormat(new Date());
  const weekDate = getWeekStartDate(todayDate);
  const monthDate = getMonthStartDate(todayDate);
  const [lastMonthStart, lastMonthEnd] = getLastMonthDates();
  const { orders } = store.getState().orderStore;
  const todayOrders = [];
  const weekOrders = [];
  const monthOrders = [];
  const lastMonthOrders = [];
  orders.forEach((order) => {
    const orderDate = convertToDateFormat(new Date(order.createdAt));
    if (new Date(todayDate).getTime() === new Date(orderDate).getTime()) {
      todayOrders.push(order);
    }
    if (
      new Date(weekDate).getTime() <= new Date(orderDate).getTime() &&
      new Date(orderDate).getTime() <= new Date(todayDate).getTime()
    ) {
      weekOrders.push(order);
    }
    if (
      new Date(monthDate).getTime() <= new Date(orderDate).getTime() &&
      new Date(orderDate).getTime() <= new Date(todayDate).getTime()
    ) {
      monthOrders.push(order);
    }
    if (
      new Date(lastMonthStart).getTime() <= new Date(orderDate).getTime() &&
      new Date(orderDate).getTime() <= new Date(lastMonthEnd).getTime()
    ) {
      lastMonthOrders.push(order);
    }
  });
  const [todayOrderCount, todayAmount] = getCountAndAmount(todayOrders);
  const [weekOrderCount, weekAmount] = getCountAndAmount(weekOrders);
  const [monthOrderCount, monthAmount] = getCountAndAmount(monthOrders);
  const [lastMonthOrderCount, lastMonthAmount] = getCountAndAmount(
    lastMonthOrders,
  );
  const OverAllSummary = [
    {
      title1: `Today's Order`,
      title2: 'Current Week Order',
      value1: todayOrderCount,
      value2: weekOrderCount,
    },
    {
      title1: `Today's Order Amount`,
      title2: 'Current Week Order Amount',
      value1: todayAmount,
      value2: weekAmount,
    },
    {
      title1: `MTD Order`,
      title2: 'Last Month Order',
      value1: monthOrderCount,
      value2: lastMonthOrderCount,
    },

    {
      title1: `MTD Order Amount`,
      title2: 'Last Month Order Amount',
      value1: monthAmount,
      value2: lastMonthAmount,
    },
  ];

  return OverAllSummary;
};

function createData(date, amount) {
  return { Date: date, 'Order Amount': amount };
}

export const prepareChartData = (params) => {
  const { store } = params;
  const { orders } = store.getState().orderStore;

  const chart = {};
  orders.forEach((e) => {
    const date = convertToDateFormat(new Date(e.createdAt));
    if (Object.hasOwnProperty.call(chart, date)) chart[date] += e.totalAmount;
    else {
      chart[date] = e.totalAmount;
    }
  });
  const chartData = Object.keys(chart).map((order) => {
    return createData(order, chart[order]);
  });
  return chartData;
};

const populateData = (header, orders) => {
  const row = [];
  orders.forEach((order) => {
    row.push([
      ...Object.keys(header).map((e) => {
        if (e === 'createdAt') {
          return convertToDateFormat(new Date(order[e]));
        }
        return order[e];
      }),
    ]);
  });
  return row;
};
export const prepareTableData = (params) => {
  const { store } = params;
  const { orders } = store.getState().orderStore;
  const headers = {
    ordersHeader: {
      _id: 'Order No',
      totalAmount: 'Total Amount',
      productCount: 'Total Quantity',
      userName: 'User Name',
    },
    userHeader: {
      userName: 'User Name',
      totalAmount: 'Total Amount',
      productCount: 'Total Quantity',
      city: 'City',
    },
  };

  const orderHeader = Object.values(headers.ordersHeader);
  const userHeader = Object.values(headers.userHeader);
  const bottomOrder = orders.length < 5 ? [] : orders.slice(orders.length - 5);
  return {
    ordersTop5: {
      row: populateData(headers.ordersHeader, orders.slice(0, 5)),
      header: orderHeader,
    },
    orderBottom5: {
      row: populateData(headers.ordersHeader, bottomOrder),
      header: orderHeader,
    },
    userTop5: {
      row: populateData(headers.userHeader, orders.slice(0, 5)),
      header: userHeader,
    },
    userBottom5: {
      row: populateData(headers.userHeader, bottomOrder),
      header: userHeader,
    },
  };
};

export const prepareReportData = (params) => {
  const { store } = params;
  const { orders } = store.getState().orderStore;

  const header = {
    userName: 'User Name',
    _id: 'Order No',
    status: 'Status',
    createdAt: 'Order Date',
    totalAmount: 'Total Amount',
    productCount: 'Total Quantity',
    city: 'City',
  };

  return {
    header: Object.values(header),
    row: populateData(header, orders),
  };
};

export const populateCities = (params) => {
  const { store } = params;
  const { orders } = store.getState().orderStore;
  const cities = [...new Set(orders.map((e) => e.city))];
  return cities;
};
export default addStore;
