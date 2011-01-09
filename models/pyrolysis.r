#See also:
# Di Blasi, C. Modeling chemical and physical processes of wood and biomass pyrolysis. Progress in Energy and Combustion Science 34, 47-90(2008).

pyrolysis_yields <- function(T) {
	# Richard & Thunman 2002
	# Equations converted from percent to fractions of 1
	# This paper also includes data for char and tar composition...
	T<-T+273.15 #convert T in Celcius to Kelvin
	#Eq. 1
	T_star <- (T-833)/160
	Y_tar <- (55.19 - 11.5*T_star - 21.69*T_star^2)/100 # kg tar/kg combustible mass
	#Eq. 2-4 - based on flash pyrolysis data
	X_C.tar <- 0.545
	X_H.tar <- 0.065
	X_O.tar <- 0.39
	#Eq. 6
	HHV_tar <- 340.95*X_C.tar+ 1322.98*X_H.tar-119.86*X_O.tar #kJ/kg
	#Eq. 7.c
	Y_char <- (5/(1-1.25*exp(-5*0.0002*(T-273))))/100
	#Note that the equations below are independent and may not sum to unity...
	#Eq. 8.c
	X_C.char <- 98/(1+exp(-98*0.00035*(T-273)))
	#Eq. 9.b
	X_H.char <- 53*exp(-0.00177*(T-273))
	#Eq. 10
	X_O.char <- 25*exp(-0.0027*(T-273))
	#Eq. 11.a & 11.b
	#if (Y_char > 0.7) {
	#		HHV_char <- 16700+2930/Y_char
	#	} else {
	#		HHV_char <- 34000
	#	}
	#Eq. 12
	HHV_char <- 318.1*X_C.char + 142.3*X_H.char + 154*X_O.char
	
	H_devol <- -200 #kJ/kg (in the temperature range 700-900K)
	cp_wood <- function(T) { 4.206*T-37.7 } #14.a
	cp_char <- function(T) { 420+2.09*T-6.85*10^-4*T } #15.b
	cp_vol <- function(T) { 1036+1.495*T-312.495*10^-6*T^2-45.569*10^-9*T^3+28.936*10^-12*T^4 } #21
	return(data.frame(Tar.Yield=Y_tar))
}