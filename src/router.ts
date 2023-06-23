import express from "express";
import register from "./firebase/requestHandlers/register/index";
import refresh from "./firebase/requestHandlers/refresh/index";
import login from "./firebase/requestHandlers/login/index";
import logout from "./firebase/requestHandlers/logout/index";
import push_doc from "./firebase/requestHandlers/push_doc/index";
import get_doc from "./firebase/requestHandlers/get_doc/index";
import set_permissions from "./firebase/requestHandlers/set_permissions/index";

const router = express.Router();

router.use("/register", register);
router.use("/refresh", refresh);
router.use("/login", login);
router.use("/logout", logout);
router.use("/push_doc", push_doc);
router.use("/get_doc", get_doc);
router.use("/set_permissions", set_permissions);

export default router;
