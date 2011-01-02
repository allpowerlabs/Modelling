engine <- NULL
engine$RPM <- 3600
engine$mean_piston_speed <- NULL
engine$displacement <- 0.962/1000 #m3 - Kubota DG972
engine$bore <- 74.5/1000 #m - Kubota DG972
engine$stroke <- 73.6/1000 #m - Kubota DG972
engine$cylinders <- 3 # Kubota DG972
engine$compression <- 8
#engine$power_per_liter <- 33700 #[W/L] - http://www.engr.colostate.edu/~allan/thermo/page7/page7.html
engine$BSFC #brake specific fuel consumption - http://www.epi-eng.com/piston_engine_technology/thermal_efficiency.htm
#BSFC = fuel_mass_flow/HP
#BSFC 0.44-0.45 [pounds/HP-hour] for gasoline

#pressure
engine$MEP <- function(work, displacement_volume) {
	#from http://www.engr.colostate.edu/~allan/thermo/page3/page3.html
	W <- work
	V_d <- displacement_volume
	P_mean <- W/V_d
	return(P_mean)
}
#engine$IMEP <- engine$MEP(indicated_work,displacement_volume)
#engine$FMEP <- engine$MEP(friction_work,displacement_volume)
#engine$BMEP <- engine$MEP(brake_work,displacement_volume)
#motoring presssure - http://www.engr.colostate.edu/~allan/thermo/page8/page8.html

#efficiency
engine$mechanical_efficiency <- function(brake_work,indicated_work) {
	W_b <- brake_work
	W_i <- indicated_work
	eta_m <- W_b/W_i
	#eta_m <- 1-W_f/W_i
	return(eta_m)
}

engine$thermal_efficiency <-function() {
	# Q_out/Q_in
}

engine$volumetric_efficiency <- function() {
	#http://www.ajdesigner.com/phpengine/engine_equations_volumetric_efficiency.php
	VE <- cylinder_density/manifold_density #http://tunertools.com/articles/volumetric-efficiency.asp
	
}
#air input measurement and calculations
#note that most equations work with air and ignore the effects of fuel volume/etc. With producer gas, this shouldn't be done, and equations should use the incoming mixture properties

engine$n_alpha <- function(rpm,throttle_angle,volumetric_efficiency) {
	#http://www.carcraft.com/techarticles/electronic_fuel_injection/index.html
	#
}

engine$speed_density <-function(rpm,map) {
	#http://www.carcraft.com/techarticles/electronic_fuel_injection/index.html
}

engine$mass_air_flow <- function(maf) {
	#http://www.carcraft.com/techarticles/electronic_fuel_injection/index.html
	#this is a value measured with a MAF, but could be predicted...
}

engine$air_mass_flow <- function() {
	#from http://marcintology.com/tuning/HowSpeedDensityWorks16.doc
	Volume<-engine$displacement
	VE <- engine$volumetric_efficiency #[g K / kPa]
	#GMVE <- ...
	MAP <- engine$map #[Pa]
	Temp <- engine$mixture_temp #[K]
	R <- 287.05  #J/(kg*K)  (assuming dry air, will be different with a producer gas mixture)
	air_mass <- (Volume*VE*MAP)/(R*Temp) #[kg]
	CylinderNumber <- engine$cylinders
	RPM <- engine$rpm
	air_flow <- CylinderNumber*RPM*air_mass/(2*60)
	
}


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


fuel$HHV <- function(C,H,O,N=0,S=0,Ash=0) {
	#http://www.woodgas.com/proximat.htm
	#"this equation fitted the experimental data with an average error of 1.45%"
	S <- 0
	Ash <- 0
	HHV <- 0.3491*C + 1.1783*H - 0.1034*O - 0.0211*Ash + 0.1005*S-0.0151*N
	return(HHV)
}

fuel$epsilon <- function(fuel) {
	a <- fuel$C
	b <- fuel$H
	c <- fuel$O
	d <- fuel$N
	#epsilon = molar_air_fuel_ratio
	epsilon <- 0.210/(a+b/4-c/2)
	return(epsilon)
}

fuel$FAR_s <- fuel$epsilon #fuel air ratio (FAR)



#Engine Energy Flows
engine_energy <- function(percent_load) {
 	outputs<-t(read.table("figures/Onovwiona_2006_4.txt",header=TRUE,sep="\t")) #t() transposes rows/columns
 	ercent<-NULL
 	for(name in row.names(outputs)) {
 		#cbind - appends data via columns
 		#approx interpolates data (returns NA if out of data range)
 		
 		#print(outputs["Engine.Percent.Load",])
 		#print(outputs[name,])
 		row <- approx(outputs["Engine.Percent.Load",],outputs[name,],percent_load)
 		percent<-rbind(percent,row)
 	}
 	return(data.frame(t(data.frame(percent,row.names=colnames(d)))[2,]))
}