cp_biomass <- function(T) {
  	# from http://www.engineeringtoolbox.com/specific-heat-solids-d_154.html
  	#kJ/kg-K
  	# 2.9		#Wood, balsa
 	# 2			#Wood, oak
 	# 2.5		#Wood, white pine
 	
 # from General equations for Biomass Properties, Richard & Thunman, 2002
 #kJ/kg-K
 	(4.206*T-37.7)/1000		#(14.a) 
	#(4.607*T-132.8)/1000		#(14.b)                                                                                 
	#(3.867*T + 103.1)/1000		#(14.c)                                                                                 

}

alkali_index <- function(HHV,ash,Y_ash,Y_K2O,Y_N2O) {
	#Source: Jenkins, B.M., Baxter, L.L., Miles Jr, T.R. & Miles, T.R. Combustion properties of biomass. Fuel Processing Technology 54, 17-46(1998).
#biomass HHV in MJ
	#Y_ash - mass fraction of biomass ash
	#Y_K2O/Y_N2O - mass fraction of biomass K2O and N2O in ash
	HHV <- HHV/1000 #convert MJ to GJ
	return((Y_ash*(Y_K2O+Y_N2O))/HHV)
}

biomass <- function(name) {
	data<-read.table("data/biomass_properties.txt",sep="\t",header=TRUE,skip=1)
	hits<-subset(data,grepl(name,data$Entity,ignore.case=TRUE))
	return(hits)
}