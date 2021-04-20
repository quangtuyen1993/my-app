import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import DialogConfigPassword from "../../components/DialogApp";
import DialogStationSettings from "../../components/DialogStationSettings";
import MTableMaterial from "../../components/MTableMaterial";
import ClientService from "../../service/client.service";

const initState = {
  openPasswordSettings: false,
  openStationSettings: false,
  users: [],
  userChange: {},
  fields: [],
  widthPercent: 10,
  userSelected: null,
};

export default function AccountScreen() {
  const [state, setState] = useState(initState);

  const onOpenPasswordSettings = (user) => {
    setState((pre) => ({
      ...pre,
      openPasswordSettings: true,
      userSelected: user,
    }));
  };

  const onOpenStationSettings = (user) => {
    setState((pre) => ({
      ...pre,
      openStationSettings: true,
      userSelected: user,
    }));
  };

  const onClosePasswordDialog = () => {
    setState((pre) => ({
      ...pre,
      openPasswordSettings: false,
    }));
  };

  const onChangePassword = async (newUser) => {
    await ClientService.changePassword(newUser);
  };

  const onSubmitPassword = (newUser) => {
    onChangePassword(newUser);
  };





  useEffect(() => {
    const onFetchUser = async () => {
      var data = await ClientService.fetchAll();
      setState((pre) => ({
        ...pre,
        users: data,
      }));
    };
    onFetchUser();
  }, []);

  const onCloseStationDialog = () => {
    setState((pre) => ({
      ...pre,
      openStationSettings: false,
      userSelected: null,
    }));
  };

  const onSubmitStation = (newUser) => {
    onChangePassword(newUser);
  };

  useEffect(() => {
    console.log("fetchAll")
    const onFetchUser = async () => {
      var data = await ClientService.fetchAll();
      setState((pre) => ({
        ...pre,
        users: data,
      }));
    };
    onFetchUser();
  }, []);
  const { userProfile } = useSelector((state) => state.authorReducer);

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
                      onOpenPasswordSettings({
                        id: userProfile.id,
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

  const controls = (user, index) => {
    return (
      <React.Fragment key={index}>
        <Box m={1} flex={1}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={IconApp.UPDATE} />}
            onClick={() => onOpenPasswordSettings(user)}
          >
            Password
          </Button>
        </Box>
        <Box m={1} flex={1}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={IconApp.BROADCAST_TOWER} />}
            onClick={() => onOpenStationSettings(user)}
          >
            Station
          </Button>
        </Box>
      </React.Fragment>
    );
  };

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
            addControlColumns={[{ name: "Configs", component: controls }]}
          />
        </CardLayout>
      </Box>

      <DialogConfigPassword
        userDefault={state.userSelected}
        open={state.openPasswordSettings}
        onSubmit={onSubmitPassword}
        handleClose={() => onClosePasswordDialog()}
      />
      <DialogStationSettings
        userDefault={state.userSelected}
        open={state.openStationSettings}
        onSubmit={onSubmitStation}
        handleClose={() => onCloseStationDialog()}
      />
    </Container>
  );
}
