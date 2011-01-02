#from Onovwiona and Ugursal, 2006, Renewable and Sustainable Energy Reviews, Elsevier
percent_reliability <- function(S,U,T) {
	#S, scheduled maintenance time [h/year]
	#U, unscheduled maintenance time [h/year]
	#T, time plant is required to be in service [h/year]
	return((T-(S+U))/(T-S))
}
percent_availability <- function(S,U,T) {
	#S, scheduled maintenance time [h/year]
	#U, unscheduled maintenance time [h/year]
	#T, time plant is required to be in service [h/year]
	return((T-(S+U))/T)
}