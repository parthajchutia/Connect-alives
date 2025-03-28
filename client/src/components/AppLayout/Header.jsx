import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { server } from "../../constants/config";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationIcon from "@mui/icons-material/Notifications";
import { userNotExists } from "../../redux/reducers/auth";
import { toast } from "react-hot-toast";

const Searchdialog = lazy(() => import("../specific/Search"));
const Notification = lazy(() => import("../specific/Notification"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const dispatch = useDispatch();
  const [ismobile, setMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const navigate = useNavigate();

  const handleMobile = () => {
    setMobile((prev) => !prev);
  };

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };

  const openNewgroup = () => {
    setIsGroup((prev) => !prev);
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };
  const navigateTOgroup = () => navigate("/groups");

  const Logouthandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });

      dispatch(userNotExists());
      toast.success(data.message);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange[800],
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Connect Alives
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewgroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateTOgroup}
              />
              <IconBtn
                title={"Notification"}
                icon={<NotificationIcon />}
                onClick={openNotification}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={Logouthandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Searchdialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
