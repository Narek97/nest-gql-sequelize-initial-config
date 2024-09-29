import { Companies } from '@Models/dbmodels/companies.model';
import { Departments } from '@Models/dbmodels/departments.model';
import { Employees } from '@Models/dbmodels/employees.model';
import { Projects } from '@Models/dbmodels/projects.model';
import { EmployeeProjects } from '@Models/dbmodels/employee-project.model';
import { Organizations } from '@Models/dbmodels/organizations.model';
import { Positions } from '@Models/dbmodels/positions.model';
import { EmployeePositions } from '@Models/dbmodels/employee-position.model';
import { ErrorLogs } from '@Models/dbmodels/error-logs.model';

export default [
  Companies,
  Departments,
  Organizations,
  Employees,
  Projects,
  EmployeeProjects,
  Positions,
  EmployeePositions,
  ErrorLogs,
];
