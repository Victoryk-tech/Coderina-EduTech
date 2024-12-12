import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import React from "react";
import { RxCross1 } from "react-icons/rx";
// import { useNavigate } from "next/navigation";
import { useRouter } from "next/navigation";

const SideBar = ({ isOpen, handleClose, Links }) => {
  const router = useRouter();

  return (
    <Drawer
      anchor={"right"}
      open={isOpen}
      onClose={handleClose}
      sx={{
        display: { xs: "block", md: "none" },
      }}
      PaperProps={{
        sx: {
          maxWidth: "50%",
          width: "100%",
        },
      }}
    >
      <List>
        <Stack alignItems={"flex-end"} p={3}>
          <IconButton size="medium" onClick={handleClose}>
            <RxCross1 />
          </IconButton>
        </Stack>
        {Links.map(({ label, path }, index) => (
          <ListItem key={`${label}-${index}`}>
            <ListItemButton onClick={() => router.push(path)}>
              {label}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
