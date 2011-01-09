#See also:
#Di Blasi, C. Dynamic behaviour of stratied downdraft gasifiers. Chemical engineering science 55, 2931-2944(2000).

gasification <- function(reactants) {
 #from Vaezi, M., Passandideh-Fard, M. & Moghiman, M. On a numerical model for gasification of biomass materials: an alternative method to combustion. journal of fuel and combustion (2008).
#Eq. 1 - CH_XO_YN_Z + w*H2O (l) + s*H2O (g) + m(O2+3.76N2) = n_H2*H2 + n_CO*CO + n_CO2 * CO2 + n_H2O * H2O + n_CH4 * CH4 + (z/2 + 3.76 m)*N2
	biomass <- c(C=,H=,O=,N=,LHV=,M_H2O=,M_bm=) #amount/C atom
	#LHV - dry basis
	biomass$MC <- biomass$M_H2O/(biomass$M_bm+biomass$M_H2O) #wet basis MC (correct?)
	#Eq. 2 - [mol H2O/kmol biomass] using masses?
	w <- (biomass$M_bm*biomass$MC)/(biomass$M_H2O*(1-biomass$MC) 
	AFR <- biomass$C+0.25*biomass$H-0.5*biomass$O
	#Eq. 3 - enthalpy of formation
	v <- c(H2=,CO=,CO2=,H2O=,CH4=,N2=)
	h_formation <- biomass$LHV
	
	water <- c(w=,s=) #amount/kmol feedstock
	air <- c(m=) #amount/kmol feedstock
	z<-
	N2 <- z/2 + 3.76*air$m
	n <- c(H2=,CO=,CO2=,H2O=,CH4=,N2=) # [moles]
}