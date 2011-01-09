combine<-function(directory,pattern,x) {
	#pattern - prefix of file group
	files <- list.files(path=directory,pattern = pattern)
	new_table <- data.frame(X=x)
	for (file in files) {
		d <- read.table(paste(directory,"/",file,sep=""),sep="\t",header=TRUE)
		var_name <- substr(file,nchar(pattern)+1,nchar(file)-4) #remove prefix and .txt
		o<- data.frame(approx(d[,1],d[,2],x))
		o<- data.frame(o[,2])
		names(o) <- var_name
		print(var_name)
		new_table <- data.frame(new_table,o)
	}
	write.table(new_table,file=paste(directory,"/",substr(pattern,,".txt",sep=""))
}