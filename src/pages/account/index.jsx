import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import DialogApp from "../../components/DialogApp";
import MTableMaterial from "../../components/MTableMaterial";
const users = [
  {
    id: 1,
    username: "test1",
    role: "Admin",
  },
  {
    id: 2,
    username: "admin",
    role: "Admin",
  },
  {
    id: 3,
    username: "livanhung",
    role: "Admin",
  },
  {
    id: 4,
    username: "nguyenhung",
    role: "Admin",
  },
];
const StyledTableCell = withStyles((theme) => ({
  root: {
    border: "1px solid white",
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function round5(x) {
  return Math.ceil(x / 5) * 5;
}

export default function AccountScreen(props) {
  const [state, setState] = useState({
    open: false,
    users: [],
    fields: [],
    widthPercent: 10,
    userSelected: {
      username: "",
    },
  });

  const onOpen = (user) => {
    setState((pre) => ({
      ...pre,
      open: true,
      userSelected: user,
    }));
  };
  const onClose = () => {
    setState((pre) => ({
      ...pre,
      open: false,
    }));
  };

  useEffect(() => {
    var fields = Object.keys(users[0]);
    fields.push("Controls");

    var widthPercent = round5(100 / fields.length);

    setState((pre) => ({
      ...pre,
      users: users,
      fields: fields,
      widthPercent: widthPercent,
    }));

    return () => {};
  }, []);

  const onSubmit = (data) => {};

  const { userProfile } = useSelector((state) => state.authorReducer);

  const renderTable = (fields, users) => {
    return (
      <Table style={{ border: "1px rgba(0,0,0,0.2) solid" }}>
        <TableHead>
          <StyledTableRow>
            {state.fields.map((item) => (
              <StyledTableCell
                // style={{ width: `30%` }}
                key={item}
              >
                {item.toUpperCase()}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {state.users.map((user, index) => (
            <StyledTableRow key={user.id}>
              {state.fields.map((f) =>
                f === "Controls" ? (
                  <StyledTableCell key={f}>
                    <Box
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                      display="flex"
                      flexDirection="row"
                    >
                      <Box flex={1}>
                        <IconButton onClick={() => onOpen(user)}>
                          <FontAwesomeIcon icon={IconApp.UPDATE} />
                        </IconButton>
                      </Box>
                      <Box flex={1}>
                        <IconButton onClick={() => onOpen(user)}>
                          <FontAwesomeIcon icon={IconApp.REMOVE} />
                        </IconButton>
                      </Box>
                    </Box>
                  </StyledTableCell>
                ) : (
                  <StyledTableCell size="small" key={f}>
                    {user[f]}
                  </StyledTableCell>
                )
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  const renderUserControl = () => {
    return (
      <Grid
        style={{ minHeight: "30vh" }}
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing={2}
      >
        <Grid item lg={6}>
          <Grid
            container
            justify="center"
            style={{
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: "10px",
              boxShadow: "1px 1px -10px black",
            }}
          >
            <Grid
              sm={12}
              md={4}
              xs={12}
              lg={2}
              style={{ display: "flex" }}
              item
            >
              <Box
                display="flex"
                flexGrow={1}
                alignItems="center"
                justifyContent="center"
                style={{ height: "100%", padding: "10px" }}
                alignContent="center"
              >
                <Avatar
                  style={{
                    width: "96px",
                    height: "96px",
                  }}
                >
                  <FontAwesomeIcon icon={IconApp.ACCOUNT} size="3x" />
                </Avatar>
              </Box>
            </Grid>
            <Grid lg={6} item>
              <Box
                display="flex"
                flexGrow={1}
                alignItems="center"
                justifyContent="center"
                style={{ height: "100%", padding: "10px" }}
                alignContent="center"
              >
                <List>
                  <ListItem dense button>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={IconApp.ACCOUNT} />
                    </ListItemIcon>
                    <ListItemText primary={userProfile.username} />
                  </ListItem>

                  <ListItem
                    dense
                    button
                    onClick={() =>
                      onOpen({
                        username: userProfile.username,
                        role: userProfile.role,
                      })
                    }
                  >
                    <ListItemIcon>
                      <FontAwesomeIcon icon={IconApp.SECURITY} />
                    </ListItemIcon>
                    <ListItemText primary={`Change Password`} />
                  </ListItem>

                  <ListItem dense button>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={IconApp.CONFIG} />
                    </ListItemIcon>
                    <ListItemText primary={userProfile.role} />
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const controls = useCallback((user, index) => {
    return (
      <React.Fragment key={index}>
        <Box flex={1}>
          <IconButton onClick={() => onOpen(user)}>
            <FontAwesomeIcon icon={IconApp.UPDATE} />
          </IconButton>
        </Box>
        <Box flex={1}>
          <IconButton onClick={() => onOpen(user)}>
            <FontAwesomeIcon icon={IconApp.REMOVE} />
          </IconButton>
        </Box>
      </React.Fragment>
    );
  }, []);

  return (
    <Container maxWidth={false}>
      <Box mb={2}>
        <CardLayout title="User Profile" icon={IconApp.CONFIG}>
          {renderUserControl()}
        </CardLayout>
      </Box>
      <Box>
        <CardLayout title="Client Manager" icon={IconApp.USERS}>
          <MTableMaterial
            dataSource={state.users}
            fieldArray={["id", "username", "role"]}
            addControlColumns={[{ name: "Controls", component: controls }]}
          />
        </CardLayout>
      </Box>

      <DialogApp
        userDefault={state.userSelected}
        open={state.open}
        handleClose={() => onClose()}
      />
    </Container>
  );
}
