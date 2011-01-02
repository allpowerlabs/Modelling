cp_air_dry <- function(T) {
	# empirical equation from http://users.wpi.edu/~ierardi/FireTools/air_prop.html
	0.00000000019327*T^4 - 0.00000079999*T^3 + 0.0011407*T^2 - 0.4489*T + 1057.5
}