
#from http://www.engr.colostate.edu/~allan/thermo/page2/page2.html
cylinder <- NULL
#The below are made up...should be replaced with real values (or inputs from different engines)
cylinder$phase <- 0
cylinder$TDC <- 0
cylinder$BDC <- 180
cylinder$crank_radius <- 1/2 * cylinder$stroke
cylinder$clearance_volume <- cylinder$volume*0.05
cylinder$maximum_volume <- cylinder$displacement_volume+cylinder$clearance_volume
cylinder$minimum_volume <- cylinder$clearance_volume #
cylinder$density <- 1.2

cylinder$displacement_volume <- function(bore, stroke) {
	#aka "swept volume"? - http://www.ajdesigner.com/phpengine/engine_equations_volumetric_efficiency.php
	#SV = engine_displacement/cylinders
	#cylinder$displacement_volume <- cylinder$maximum_volume - cylinder$minimum_volume
	b <- bore
	s <- stroke
	V_d <- (pi/4)*(b^2)*s
	return (V_d)
}

cylinder$clearance_volume <- function(compression,displacement_volume) {
	#http://www.engr.colostate.edu/~allan/thermo/page2/page2.html
	# equal to CCV+HGV+PDC = Combuston Chamber+Head Gasket+Piston Deck Volume (?) - http://www.ajdesigner.com/phpengine/engine_equations_volumetric_efficiency.php
	V_d <- displacement_volume
	r <- compression
	V_c <- V_d/(1-r)
	return(V_c)
}



cylinder$compression_ratio <- function(maximum_volume, clearance_volume) {
	# aka CR
	V_1 <- maximum_volume
	V_c <- clearance_volume
	r <- 1 + V_1/V_c
	return(r)
}

cylinder$volume <- function(displacement_volume, compression_ratio, connecting_rod_length, crank_radius, crank_angle) {
	#from http://www.engr.colostate.edu/~allan/thermo/page2/page2.html
	V_d <- displacement_volume
	r <- compression_ratio
	R <- connecting_rod_length/crank_radius
	theta <- crank_angle
	
	V <- (V_d/(r-1))+(V_d/2)*(1+R-cos(theta)-(R^2-sin(theta)^2)^0.5)
	return(V)
	#cylinder$volume <- function(cylinder,crank_angle) {
#	x<- cylinder$crank_radius+cylinder$connecting_rod_length-((cylinder$connecting_rod_length^2+cylinder$crank_radius^2*sin(cylinder$crank_angle)^2)^(1/2)+cylinder$crank_radius*cos(cylinder$crank_angle))
#	volume <- cylinder$clearance_volume+cylinder$x*(pi*(b/2)^2)
#	return(volume)
#}
}

cylinder$Q_in <- function(cylinder,fuel, equivalence_ratio) {
	#adapted from http://www.engr.colostate.edu/~allan/thermo/page10/page10.html
	attach(cylinder)
	attach(fuel)
	V_d <- displacement_volume(bore,stroke)
	phi <- equivalence_ratio
	m_mixture <- density*V_d
	FAR_act <- phi*FAR_s
	AFR_act <- 1/FAR_act
	m_fuel_actual <- m_mixture*FAR_act
	#m_air_actual <- m_mixture*AFR_act 
	Q_in <- HHV(C,H,O,N)*m_fuel_actual
	detach(fuel)
	detach(cylinder)
}

cylinder$Q_in_by_power <- function(power,rpm) {
}

#Heat loss through wall - http://www.engr.colostate.edu/~allan/thermo/page8/page8.html
