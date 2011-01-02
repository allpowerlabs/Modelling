
#Source:Mujumdar, A. S., & Devahastin, S. (2000). Fundamental principles of drying. Mujumdar’s Practical Guide to Industrial Drying. Retrieved from http://staff.sut.ac.ir/haghighi/download/documents/Drying.pdf.

#a_w - water activity
#p - vapor pressure of water in the substance (http://en.wikipedia.org/wiki/Water_activity)
#p_0 - vapor pressure of pure water at the same temperature as p
a_w <- p/p_w
#RH - relative humidity
RH <- a_w * 100 #[%]


#X_star - equilibrium moisture content
#X - dry-basis moisture content
#X_f - free moisture content
X_f<- X-X_star

#N - drying rate [kg m-2 h-1]
#N_c - constant drying rate (heat/mass transfer limited)
#A - evaporation area
#M_s - mass of bone dry solid
#X_c - critical moisture content (N becomes transport limited)
#lambda_s - latent heat of vaporization at solid temperature [J kg-1]
# heat_input - sum of heat fluxes (convection, conduction and/or radiation)
#when drying is purely convective and X<X_c
#	T_surface = T_film = wet-bulb temperature
N <- -(M_s/A)*(dX/dt)
t_d <- (M_s/A)*(dX/N) #?

N_c <- heat_input/lambda_s
t_c <- -(M_s/A)
