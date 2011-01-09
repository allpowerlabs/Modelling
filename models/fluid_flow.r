ergun <- function(fluid_viscosity,void_space,superficial_velocity,particle_diameter,fluid_density) {
	#http://wiki.gekgasifier.com/w/page/6123711/Filter-Pressure-Drop-vs-Char-Diameter
	mu <- fluid_viscosity #dynamic viscocity, [kg/m-s]
	epsilon <- void_space #
	u_0 <- superficial_velocity #[m/s]
	d_p <- particle_diameter #[m]
	ro <- fluid_density #[kg/m3]
	# pressure drop per length (deltaP/L)
	dp <- (150*mu*(1-epsilon)^2*u_0)/(epsilon^3*d_p^2) + (1.75*(1-epsilon)*ro*u_0^2)/(epsilon^3*d_p)
	return(dp)
}