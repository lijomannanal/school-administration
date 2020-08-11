import Express from 'express';
import DataImportController from './controllers/DataImportController';
import HealthcheckController from './controllers/HealthcheckController';
import FetchStudentsController from './controllers/FetchStudentsController';
import UpdateClassController from './controllers/UpdateClassController';
import FetchWorkLoadReportController from './controllers/FetchWorkLoadReportController';

const router = Express.Router();

router.use('/', DataImportController);
router.use('/', HealthcheckController);
router.get('/class/:classCode/students', FetchStudentsController);
router.put('/class/:classCode', UpdateClassController);
router.get('/reports/workload', FetchWorkLoadReportController);

export default router;
