/**
 * Central export for all services
 */

export * from './auth.service';
export * from './user.service';
export * from './job.service';
export * from './interview.service';
export * from './notification.service';

import authService from './auth.service';
import userService from './user.service';
import jobService from './job.service';
import interviewService from './interview.service';
import notificationService from './notification.service';

export {
  authService,
  userService,
  jobService,
  interviewService,
  notificationService,
};
