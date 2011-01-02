moisture_content<-0.5 #
ash_content<- 0.05
wet_mass<-100
energy_density<-18 #MJ/kg
water_mass<-moisture_content*wet_mass
dry_mass <- wet_mass-water_mass
ash_mass <- dry_mass*ash_content
dry_af_mass <- dry_mass*(1-ash_content)
hhv<- dry_mass*energy_density