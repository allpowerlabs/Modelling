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