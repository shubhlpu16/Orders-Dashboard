import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

// import { mainListItems, secondaryListItems } from './listItems';
import Summary from '../../components/Summary';
import Title from '../../components/Title';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import Report from '../../components/Report';
// import Orders from './Orders';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#2196f3',
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
  },
  titleContainer: {
    marginBottom: '24px',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    color: '#42a5f5',
  },
  fixedHeight: {
    height: 210,
  },
  tableHeight: {
    height: 'max-content',
    overflow: 'hidden',
  },
  chartHeight: {
    height: 400,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const tableHeight = clsx(classes.tableHeight, classes.paper);
  const chartHeight = clsx(classes.chartHeight, classes.paper);

  const displayOrderSummary = () => (
    <>
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={clsx(fixedHeightPaper, { backgroundColor: 'red' })}>
          <Summary
            summary={{
              title1: `Today's Order`,
              title2: 'Current Week Order',
              value1: '2300',
              value2: '400',
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Summary
            summary={{
              title1: `Today's Order`,
              title2: 'Current Week Order',
              value1: '2300',
              value2: '400',
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Summary
            summary={{
              title1: `Today's Order`,
              title2: 'Current Week Order',
              value1: '2300',
              value2: '400',
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Summary
            summary={{
              title1: `Today's Order`,
              title2: 'Current Week Order',
              value1: '2300',
              value2: '400',
            }}
          />
        </Paper>
      </Grid>
    </>
  );

  const displayOrderTable = () => (
    <Grid item xs={12} spacing={3}>
      <Paper className={tableHeight} p={12}>
        <Title>Top 5 Order</Title>
        <Table />
        <Box mt={5} mb={2}>
          <Title>Bottom 5 Order</Title>
          <Table />
        </Box>
      </Paper>
    </Grid>
  );

  const displayUserTable = () => (
    <Grid item xs={12} spacing={3}>
      <Paper className={tableHeight} p={12}>
        <Title>Top 5 User</Title>
        <Table />
        <Box mt={5} mb={2}>
          <Title>Bottom 5 User</Title>
          <Table />
        </Box>
      </Paper>
    </Grid>
  );

  const displayReport = () => (
    <Grid item xs={12}>
      <Paper className={tableHeight}>
        <Title>Order Report</Title>
        <Report />
      </Paper>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.titleContainer}>
            <Typography
              component="h1"
              variant="h5"
              color="textSecondary"
              noWrap
              className={classes.title}
            >
              Order Summary:
            </Typography>
          </div>
          <Grid container spacing={3} mt={24}>
            {/* Chart */}

            {displayOrderSummary()}

            <Grid item xs={12} mt={4}>
              <Paper className={chartHeight}>
                <Chart />
              </Paper>
            </Grid>
            {displayOrderTable()}
            {displayUserTable()}
            {displayReport()}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
