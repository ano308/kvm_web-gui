#!/bin/bash

# Parameter aus der URL abrufen
country="$1"
name="$2"

# Hier kannst du die weiteren Schritte mit der Variable `country` ausführen
echo "Das ausgewählte OS ist: $country"
echo "Das ausgewählte Name ist; $name"

virt-install --name=$name \
--os-type=Linux \
--os-variant=debian9 \
--vcpu=2 \
--ram=2048 \
--graphics spice \
--location=/home/gibe/ProjektNPM/ISO/$country \
--network bridge:virbr0
