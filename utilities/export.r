export <- function() {
	#Create HTML data tables
	require(HTMLUtils)
	bp<-read.table("../data/biomass_properties.txt",sep="\t",header=TRUE,skip=1)
HTMLsortedTable(bp,"Biomass Properties",file = "biomass_properties.html",path = paste(getwd(),"/documentation/",sep=""))

	#Create Latex Documents
	Sweave("documentation/intro.Rnw")
	
	#Create HTML Documents
	#Doesn't work with Rnw (e.g. latex to HTML), expects noweb chunks embedded in HTML
	#Sweave("documentation/intro.Rnw",driver=RweaveHTML)
}