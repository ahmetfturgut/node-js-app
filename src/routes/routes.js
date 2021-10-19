const {
	userRoute,
	courseEnrollmentRoute,
	courseRoute,
	scoreRoute,
	lessonRoute,
} = require('./routes.index');

exports.assignRoutes = app => {
	userRoute.assignRoutes(app);
	courseEnrollmentRoute.assignRoutes(app);
	courseRoute.assignRoutes(app);
	scoreRoute.assignRoutes(app);
	lessonRoute.assignRoutes(app);
};
