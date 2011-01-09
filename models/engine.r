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
	#VE <- cylinder_density/manifold_density #http://tunertools.com/articles/volumetric-efficiency.asp
	VE <- 0.85
	print("Engine Volumetric Efficiency Set To 85% (Generic Engine)")
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
