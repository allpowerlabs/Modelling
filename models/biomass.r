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
