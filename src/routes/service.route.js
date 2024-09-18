import {
  createService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
} from "../controller/service.controller.js";
import { Router } from "express";

const router = Router();

router.route("/create-service").post(createService);
router.route("/get-all-services").get(getAllServices);
router.route("/update-service/:serviceId").patch(updateServiceById);
router.route("/delete-service/:serviceId").delete(deleteServiceById);

export default router;
