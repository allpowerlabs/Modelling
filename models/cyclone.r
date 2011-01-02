#Started from: A Novel Approach of Performance Enhancement Studies of Cyclone Separator as a Diesel Exhaust Soot Particulate Emission Arrester with a Continuous Ceramic Packed Fibre Filter Placed at the End of the Vortex Finder Tube
#Dr N Mukhopadhyay, Member
d_p <- ... #particle diameter
ro_p <- ... #particle density


theta <- 2*pi*(h+L_1)/a
L_1 <- ((r_2-r_1)/(r_2-(B/2)))*(H-h)
eff<-1-((1-0.67*D_c^0.14)*((t+273)/293)^0.3)
grade_eff<-function() {
	K <- -(((1-n)*Q*ro_p*(d_p^2)*theta)/(18*a*mu*(r_2^(1-n)-r_1^(1-n))))
   theta_elem <- (2*pi*dZ)/a
	eff<- 1-exp(K/((r^n)*(r-?)))
}