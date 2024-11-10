// React
import React, { useState, useEffect, useCallback } from "react";

// Design
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { deepOrange } from "@mui/material/colors";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Internal
// import {
//   getStation,
//   getStationList,
//   setStationId,
//   getLanguageList,
//   getAppBarButtonList,
//   getAlerts,
// } from "../store/slices/app";
// import authSlice, { getUserInitials } from "../store/slices/auth";
// import updatePath from "../utils/functions/updatePath";
// import getOriginalURLPath from "../utils/functions/getOriginalURLPath";
// import AlertsDialog from "./AlertsDialog";

// Third-party
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const HOME_URL = "/menu";

const appBarBoxStyle = {
  display: "flex",
  width: "100%",
  gap: 4,
  flexDirection: "column",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
};

const style = {
  appBar: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: '8px 16px 8px 25px',
    bgcolor: "background.paper",
    boxShadow: 2,
    height: "100vh",
    // position: 'fixed',
    paddingTop: 1,
    gap: 4,
  },
  appBarFirstBox: Object.assign({}, appBarBoxStyle, {
    justifyContent: "flex-start",
  }),
  appBarSecondBox: Object.assign({}, appBarBoxStyle, {
    justifyContent: "center",
  }),
  appBarThirdBox: Object.assign({}, appBarBoxStyle, {
    justifyContent: "flex-end",
    paddingBottom: 2,
  }),
  cardMedia: {
    height: "auto",
    width: "50px",
  },
  buttonImage: {
    height: 30,
    width: 30,
    filter: "invert(1)",
  },
  avatar: {
    cursor: "pointer",
    color: (theme) => theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: 46,
    height: 46,
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: deepOrange[600],
    },
  },
};

export default function CustomAppBar({ extraButtons }) {
  const hasExtraButtons =
    Array.isArray(extraButtons) && extraButtons.length > 0;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // const station = useSelector(getStation);
  // const stationList = useSelector(getStationList);
  // const languageList = useSelector(getLanguageList);
  // const appBarButtonList = useSelector(getAppBarButtonList);
  // const userInitials = useSelector(getUserInitials);
  // const alerts = useSelector(getAlerts);
  // const alertsLength = alerts.length;

  const [alertsDialogOpen, setAlertsDialogOpen] = useState(false);
  const [stationAnchorEl, setStationAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  // const [buttonList, setButtonList] = useState(appBarButtonList);

  const stationOpen = Boolean(stationAnchorEl);
  const languageOpen = Boolean(languageAnchorEl);
  const avatarOpen = Boolean(avatarAnchorEl);

  // const user = useSelector(getUser);

  const handleCloseAlertsDialog = useCallback(() => {
    setAlertsDialogOpen(false);
  }, [setAlertsDialogOpen]);

  const handleClickAvatar = (event) => setAvatarAnchorEl(event.currentTarget);
  const handleCloseAvatarMenu = (event) => setAvatarAnchorEl(null);

  const handleClickAlerts = () => setAlertsDialogOpen(true);
  const handleClickStation = (event) => setStationAnchorEl(event.currentTarget);
  const handleCloseStationMenu = (event) => setStationAnchorEl(null);

  const handleClickLanguageMenu = (event) =>
    setLanguageAnchorEl(event.currentTarget);
  const handleCloseLanguageMenu = (event) => setLanguageAnchorEl(null);

  const handleClickEyeflow = () =>{}
    // navigate(updatePath(HOME_URL, station), { state: { changeType: "click" } });
  const handleClickUserSettings = () => {}
    // navigate(updatePath("/app/user-settings", station), {
      // state: { changeType: "click" },
    // }); //TODO

  const handleClickLogout = () => {
    // dispatch(authSlice.actions.logout());
  };

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    handleCloseLanguageMenu();
  };

  // const onChangeStation = (newStation) => () => {
  //   dispatch(setStationId(newStation._id));
  //   let originalURL = getOriginalURLPath(location.pathname);
  //   if (originalURL?.params?.hasOwnProperty("stationSlugLabel")) {
  //     navigate(updatePath(originalURL.pattern.path, newStation), {
  //       state: { changeType: "click" },
  //     });
  //   }
  //   handleCloseStationMenu();
  // };

  // open userManual.pdf from public/assets
  // const openUserManual = () => {
  //   let windowConfig = window.app_config.pages;
  //   let windowPath = window.location.pathname.split("/");
  //   windowPath = windowPath[windowPath.length - 1];

  //   let currentPage = Object.keys(windowConfig).find(key => {
  //     let pagePath = windowConfig[key].path;
  //     pagePath = pagePath.split("/");
  //     pagePath = pagePath[pagePath.length - 1];

  //     return pagePath === windowPath
  //   });
    
  //   let currentWindow = windowConfig[currentPage];

  //   if (currentWindow.component === "Dashboard" || currentWindow.component === "QueriesPipelines" || currentWindow.component === "Report") {
  //     window.open("/assets/graphManual.pdf", "_blank")
  //   } else if (currentWindow.component === "Monitor") {
  //     window.open("/assets/componentsManual.pdf", "_blank");
  //   } else {
  //     window.open("/assets/userManual.pdf", "_blank");
  //   }
  // };

  // useEffect(() => {
  //   // console.log(window.app_config.components.AppBar)
  //   let newButtonList = appBarButtonList.map((buttonData) => {
  //     let copyButtonData = { ...buttonData };
  //     if (copyButtonData.id === "alerts") {
  //       copyButtonData.onClick = handleClickAlerts;
  //     } else if (copyButtonData.id === "station") {
  //       copyButtonData.onClick = handleClickStation;
  //     } else if (copyButtonData.id === "language") {
  //       copyButtonData.onClick = handleClickLanguageMenu;
  //     }
  //     return copyButtonData;
  //   });

  //   setButtonList(newButtonList);
  // }, [appBarButtonList]);

  return (
    <>
      <Box
        width={window.app_config.components.AppBar.width ?? 64}
        sx={style.appBar}
      >
        {/* <Box sx={style.appBarFirstBox}>
          <ButtonBase>
            <CardMedia
              sx={style.cardMedia}
              image={"/assets/EyeFlowLogo-mask.png"}
              title="Home"
              component="img"
              onClick={handleClickEyeflow}
            />
          </ButtonBase>
        </Box> */}

        {/* {hasExtraButtons && (
          <Box sx={style.appBarSecondBox}>
            {extraButtons.map((buttonProps, index) => (
              <Tooltip key={index} title={t(buttonProps.label)}>
                <IconButton onClick={buttonProps.onClick} size="small">
                  <img
                    alt=""
                    src={buttonProps.icon}
                    style={style.buttonImage}
                  />
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        )} */}
        <Box sx={style.appBarThirdBox}>
          {/* <Tooltip title={t("user_manual")}>
            <IconButton onClick={openUserManual} size="small">
              <HelpIcon fontSize="large" />
            </IconButton>
          </Tooltip> */}

          {/* {buttonList.map((buttonProps, index) => (
            <Tooltip key={index} title={t(buttonProps.label)}>
              {buttonProps.type === "alerts" ? (
                <Badge
                  showZero
                  badgeContent={alertsLength}
                  color={alertsLength === 0 ? "success" : "error"}
                >
                  <IconButton onClick={buttonProps.onClick} size="small">
                    <img
                      alt=""
                      src={buttonProps.icon}
                      style={style.buttonImage}
                    />
                  </IconButton>
                </Badge>
              ) : (
                <IconButton onClick={buttonProps.onClick} size="small">
                  <img
                    alt=""
                    src={buttonProps.icon}
                    style={style.buttonImage}
                  />
                </IconButton>
              )}
            </Tooltip>
          ))} */}

          <IconButton onClick={handleClickAvatar} sx={style.avatar}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Box>

      {/* <Menu
        anchorEl={stationAnchorEl}
        open={stationOpen}
        onClose={handleCloseStationMenu}
        id="station-menu"
      >
        {stationList.map((stationData) => (
          <MenuItem
            key={stationData._id}
            value={stationData._id}
            onClick={onChangeStation(stationData)}
            selected={stationData._id === station._id}
          >
            {stationData.label}
          </MenuItem>
        ))}
      </Menu> */}

      {/* <Menu
        anchorEl={languageAnchorEl}
        open={languageOpen}
        onClose={handleCloseLanguageMenu}
        id="language-menu-button"
      >
        {languageList.map((languageData) => (
          <MenuItem
            key={languageData.id}
            value={languageData.id}
            onClick={() => onChangeLanguage(languageData.id)}
            selected={languageData.id === i18n.language}
          >
            {languageData.label}
          </MenuItem>
        ))}
      </Menu> */}

      <Menu
        anchorEl={avatarAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={avatarOpen}
        onClose={handleCloseAvatarMenu}
        id="avatar-button"
      >
        <MenuItem onClick={handleClickUserSettings}>
          User Settings
        </MenuItem>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>

      {/* <AlertsDialog
        open={alertsDialogOpen}
        handleClose={handleCloseAlertsDialog}
        alerts={alerts}
        stationId={station?._id}
      /> */}
    </>
  );
}
