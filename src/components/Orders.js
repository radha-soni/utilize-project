import React, { useState } from "react";
import clsx from "clsx";
import memoize from "memoize-one";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditDialog from "./EditDialog";
import { dummyData } from "../store/dummyData";
import CreateDialog from "./CreateDialog";

const useTableStyles = makeStyles(theme => ({
  root: {
    display: "block",
    flex: 1
  },
  table: {
    height: "100%",
    width: "100%"
  },
  list: {},
  thead: {},
  tbody: {
    width: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    boxSizing: "border-box",
    minWidth: "100%",
    width: "100%",
    alignItems: "baseline"
  },
  headerRow: {
    background: "#3f51b5",
    alignItems: "center"
  },
  cell: {
    display: "block",
    flexGrow: 0,
    flexShrink: 0,
    border: "none",
    overflow: "hidden",
    boxSizing: "border-box",
    margin: "0 20px",
    wordBreak: "break-word",
    padding: 5
  },
  headerCell: {
    boxSizing: "border-box",
    fontWeight: 600,
    color: "#fff",
    padding: "20px 5px"
  },
  expandingCell: {
    flex: 1
  },
  column: {}
}));

const TableColumns = ({ classes, columns }) => {
  return (
    <TableRow component="div" className={clsx(classes.row, classes.headerRow)}>
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            key={colIndex}
            component="div"
            variant="head"
            className={clsx(
              classes.cell,
              classes.column,
              classes.headerCell,
              !column.width && classes.expandingCell
            )}
            style={{
              flexBasis: column.width || false,
              height: ROW_SIZE
            }}
            scope="col"
          >
            {column.label}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const ROW_SIZE = 60;

const Row = ({
  index,
  style,
  data: { columns, items, classes, handleDelete, handleEdit }
}) => {
  const item = items[index];

  return (
    <TableRow component="div" className={classes.row} style={style}>
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            key={item.id + colIndex}
            component="div"
            variant="body"
            className={clsx(
              classes.cell,
              !column.width && classes.expandingCell
            )}
            style={{
              flexBasis: column.width || false,
              height: ROW_SIZE
            }}
          >
            {column.dataKey === "delete" && (
              <Button color="primary" onClick={() => handleDelete(index)}>
                <DeleteIcon color="primary" />
              </Button>
            )}
            {column.dataKey === "edit" && (
              <EditDialog index={index} order={item} handleEdit={handleEdit} />
            )}
            {item[column.dataKey]}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const itemKey = (index, data) => data.items[index].id;

const createItemData = memoize(
  (classes, columns, data, handleDelete, handleEdit) => ({
    columns,
    classes,
    items: data,
    handleDelete,
    handleEdit
  })
);

const ReactWindowTable = ({ data, columns, handleDelete, handleEdit }) => {
  const classes = useTableStyles();

  const itemData = createItemData(
    classes,
    columns,
    data,
    handleDelete,
    handleEdit
  );

  return (
    <div className={classes.root}>
      <Table className={classes.table} component="div">
        <TableHead component="div" className={classes.thead}>
          <TableColumns classes={classes} columns={columns} />
        </TableHead>

        <TableBody component="div" className={classes.tbody}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={classes.list}
                height={height}
                width={width}
                itemCount={data.length}
                itemSize={ROW_SIZE}
                itemKey={itemKey}
                itemData={itemData}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </TableBody>
      </Table>
    </div>
  );
};

const columns = [
  {
    label: "Order ID",
    dataKey: "id",
    width: 200
  },
  {
    label: "Customer Name",
    dataKey: "customer_name",
    width: 150
  },
  {
    label: "Customer Email",
    dataKey: "customer_email",
    width: 200
  },
  {
    label: "Product",
    dataKey: "product",
    width: 120
  },
  {
    label: "Quantity",
    dataKey: "quantity",
    width: 75
  },
  {
    label: "",
    dataKey: "delete",
    width: 75
  },
  {
    label: "",
    dataKey: "edit",
    width: 75
  }
];

const data = dummyData;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  container: {
    flexGrow: 1,
    height: 500
  },
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  toolbar: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(4)
  },
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  button: {
    width: 300,
    height: 50,
    position: "absolute",
    right: 0
  }
}));

const Orders = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState(data);

  function handleDelete(index) {
    setOrders(orders => {
      var updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      return updatedOrders;
    });
  }

  function handleEdit(index, order) {
    setOrders(orders => {
      var updatedOrders = [...orders];
      updatedOrders[index] = order;
      return updatedOrders;
    });
  }

  function handleCreate(order) {
    setOrders(orders => {
      var updatedOrders = [...orders];
      updatedOrders.unshift(order);
      return updatedOrders;
    });
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h2" variant="h5" className={classes.title}>
              {"Orders"}
            </Typography>
            <CreateDialog classes={classes} handleCreate={handleCreate} />

            <div className={classes.spacer} />
          </Toolbar>

          <ReactWindowTable
            data={orders}
            columns={columns}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default Orders;
