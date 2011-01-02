#Note, some of these models may be based on empirical data, results may not interelate well.

T_tred <- function(Q_air_in=NA,Q_gas_out=NA,Power=NA) {
	data.frame(
		#Testing, entirely made up...
		
		Power = 0.3*Power+1,
		Q_air_in = 4*sqrt(Q_air_in)-2,
		Q_gas_out = 3*Q_gas_out/3
	)
}