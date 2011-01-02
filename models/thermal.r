#Conduction - http://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html

thermal_resistivity <- function(thermal_conductivity) {
	return(1/thermal_conductivity)
}

conductive_heat_transfer <- function(area,thermal_conductivity,delta_T,thickness) {
	#Fourier's Law - http://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html
	A<- area
	k <- thermal_conductivity
	dT <- delta_T
	s <- thickness
	q <-  (k*A*dT)/s
	return(q)
}

thermal_resistance <- function(area,thermal_conductivity,thickness) {
	#http://web.mit.edu/16.unified/www/FALL/thermodynamics/notes/node118.html
	#series - total R = R1+R2.. - insulation over a wall
	#parallel - total R = 1/(1/R1+1/R2...) - bolt through insulation
	A<- area
	k <- thermal_conductivity
	s <- thickness
	R <- s/(k*A)
	return(R)
}

layers <- data.frame(T=c(25,NA,NA,100),k=c(NA,1,2,NA),A=c(NA,2,2,NA),s=c(NA,.1,.3,NA))
R_tot <- 1/sum(1/R,na.rm=TRUE) #total R
dT <- layers$T[1]-layers$T[length(layers)]
Q <- dT/R

radial_heat_loss <- function(r_inside,r_outside,t_inside,t_outside,thermal_conductivity,delta_T) {
 	#http://www.engineeringtoolbox.com/conductive-heat-loss-cylinder-pipe-d_1487.html
 	r_i <- r_inside
 	r_o <- r_outside
 	t_i <- t_inside
 	t_o <- t_outside
 	dT <- t_i - t_o
	k <- thermal_conductivity
	q <-  (2*pi*k*dT)/(log(r_o/r_i)) #log is natural log (base e) in R
}