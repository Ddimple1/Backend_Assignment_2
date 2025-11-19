import express, {Router} from "express";
import employeeRoutes from "./employeeRoutes";
import branchRoutes from "./branchesRoutes";

const router: Router = express.Router();

router.use("/employees", employeeRoutes);
router.use("/branches", branchRoutes); 


export default router;