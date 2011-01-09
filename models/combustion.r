combustion_products <- function(fuel,lambda,T) {
	#x_i - mole fraction
	#n_i - molar amount
	#n - total moles
	#m_i - mass of subcomponent
	#m_tot - total mass
	#w_i - mass fraction (Y_i?)
	T<- T+273.15 # convert C to K
	C<-fuel$x$C
	H<-fuel$x$H
	O<-fuel$x$O
	N<-fuel$x$N
	phi <- 1/lambda #phi = equivalence_ratio = 1/lambda - http://en.wikipedia.org/wiki/Air-fuel_ratio
	epsilon <- 0.210/(C+H/4-O/2) #molar fuel/air ratio
	products <- NULL
	if (T<=1000) {
		if (phi <= 1) {
			CO2 <- C*phi*epsilon
			H2O <- H*phi*epsilon/2
			N2 <- 0.79+N*phi*epsilon/2
			O2 <- 0.21*(1-phi)
			CO <- 0
			H2 <- 0
		} else {
			t<-T/1000
			K<-exp(2.743-1.762/t-1.611/(t^2)+0.2803/(t^3))
			a_1 <- 1-K
			b_1 <- 0.42-phi*epsilon*(2*C-O)+K*(0.42*(phi-1)+C*phi*epsilon)
			c_1 <- -0.42*C*phi*epsilon*(phi-1)*K
			v_5 <- (-b_1+sqrt(b_1^2-4*a_1*c_1))/(2*a_1)
			CO2 <- C*phi*epsilon-v_5
			H2O <- 0.42-phi*epsilon*(2*C-O)+v_5
			N2 <- 0.79+N*phi*epsilon/2
			O2 <- 0
			CO <- v_5
			H2 <- 0.42*(phi-1)-v_5
		}
		products$x <-data.frame(CO2=CO2,H2O=H2O,N2=N2,O2=O2,CO=CO,H2=H2)
		products$Lambda <- lambda
		products$T_comb <- T-273.15 #convert K to C
	} else {
		products$x <- NULL
		print("Combustion product prediction only valid under 1000 K")
	}
	return(products)
}
