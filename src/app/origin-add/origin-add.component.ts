import { ElementRef, NgZone, Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { OriginService } from '../origin.service';
import { } from 'googlemaps';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { FormControl } from '@angular/forms';

declare var google: any;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

@Component({
  selector: 'app-origin-add',
  templateUrl: './origin-add.component.html',
  styleUrls: ['./origin-add.component.scss']
})
export class OriginAddComponent implements OnInit {
  
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @Input() initial:any;

  newOrigin = {
    address: '',
    country: '',
    city: '',
    state: '',
    postal_code: '',
    description: ''
  }
  country:any
  street_number:any
  route:any
  locality:any
  administrative_area_level_1:any
  postal_code:any
  showPopup:any;
  
  constructor(private _auth: AuthService,  
    private _origin: OriginService,
    private _loader: MapsAPILoader,
    private _zone: NgZone
  ) { }
  
  ngOnInit() {
    this.showPopup = this.initial;
  }
  
  autocomplete() {
    console.log("oye apenas entré")
    this._loader.load().then(() => {
      console.log(document.getElementById("autocompleteInput"))
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteInput"), {types: ["address"]});
        console.log("oye apenas entré al loader")
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          console.log("cambioooo")
          this._zone.run(() => {
            var place = autocomplete.getPlace();
            // console.log(place);
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 14;
            // console.log("address: " +this.address)
            for (var i = 0; i < place.address_components.length; i++) {
              var addressType = place.address_components[i].types[0];
              // console.log(place.address_components[i].types[0])
              if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                // if (addressType.includes("street_number")) {
                  //   this.newOrigin.street_number = val
                  // }
                  // if (addressType.includes("route")) {
                    //   this.newOrigin.route = val
                    // }
                    if (addressType.includes("locality")) {
                      this.newOrigin.city = val
                    }
                    if (addressType.includes("country")) {
                      this.newOrigin.country = val
                    }
                    if (addressType.includes("postal_code")) {
                      this.newOrigin.postal_code = val
                    }
                    if (addressType.includes("administrative_area_level_1")) {
                      this.newOrigin.state = val
                    }
                    console.log(addressType + '=' +val)
                  }
                }
                console.log("Terminó")
              });
            });
          });
        }
        // google maps zoom level
        zoom: number = 8;
        
        // initial center position for the map
        lat: number = 48.8587741;
        lng: number = 2.2074741;
        
      

  addOrigin() {
    this._origin.createOrigin(this.newOrigin).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    this.showPopup = false; 
    this.newOrigin = {
      address: '',
      country: '',
      city: '',
      state: '',
      postal_code: '',
      description: ''
    }
  }

  hiddePopup() {
    this.showPopup = false;
  }
  
  openPopup () { 
    this.showPopup = true;
    setTimeout(() => {
      this.autocomplete();
    }, 0)
    this.newOrigin = {
      address: '',
      country: '',
      city: '',
      state: '',
      postal_code: '',
      description: ''
    }
  }

}
