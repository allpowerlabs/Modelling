gas<-NULL
gas$composition <- list(N2=0.5,H2=0.2,CO=0.2,CH4=0.05,O2=0.01)
gas$density<-function(composition) {
	#doesn't work yet
	densities <- read.table("tables/Density.txt",sep="\t",header=TRUE)
	for (i in seq(1,length(composition))) {
		name<-names(composition[i])
		print(densities[name,])
	}
	#gas$Density <- ro_CO*(gas$PercentCO/100)+ro_CO2*(gas$PercentCO2/100)+ro_H2*(gas$PercentH2/100)+ro_CH4*(gas$PercentCH4/100)+ro_O2*(gas$PercentO2/100)+ro_N2*(gas$PercentMakeupN2/100)
	#sum(ro_gas*x_gas)
}

gas$HHV <- function() {
	#sum(HHV_gas*x_gas)
}