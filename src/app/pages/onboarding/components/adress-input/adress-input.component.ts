import { componentHandlers } from './const/component-handlers';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { Address } from '../../consts/interfaces/user.interface';

@Component({
  selector: 'app-adress-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGpAutocompleteModule,
  ],
  templateUrl: './adress-input.component.html',
  styleUrls: ['./adress-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AdressInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AdressInputComponent,
      multi: true,
    },
  ],
})
export class AdressInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input()
  public placeholder: string = '';

  public inputForm: FormGroup | undefined;
  private subscription: Subscription = new Subscription();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      adress: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      type: ['PREVIOUS', [Validators.required]],
    });
  }

  public writeValue(val: Address): void {
    const updVal = {
      ...val,
      adress:
        val.streetAddress && val.city && val.state && val.zipCode
          ? `${val.streetAddress}, ${val.city}, ${val.state}, ${val.zipCode}`
          : '',
    };
    val &&
      this.inputForm &&
      this.inputForm.patchValue(updVal, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.subscription.add(this.inputForm?.valueChanges.subscribe(fn));
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.inputForm?.disable({ emitEvent: false })
      : this.inputForm?.enable({ emitEvent: false });
  }

  public validate(): ValidationErrors | null | undefined {
    return {
      ...this.inputForm?.controls['adress'].errors,
      ...this.inputForm?.controls['streetAddress'].errors,
      ...this.inputForm?.controls['city'].errors,
      ...this.inputForm?.controls['state'].errors,
      ...this.inputForm?.controls['zipCode'].errors,
      ...this.inputForm?.controls['type'].errors,
    };
  }

  public onAdressChange(place: google.maps.places.PlaceResult) {
    if (place.address_components) {
      const parsedAdress = this.parseAddress(place.address_components);
      const updVal = {
        ...parsedAdress,
        adress: `${parsedAdress.streetAddress}, ${parsedAdress.city}, ${parsedAdress.state}, ${parsedAdress.zipCode}`,
      };
      this.inputForm?.patchValue(updVal, { emitEvent: true });
    }
  }

  private parseAddress(
    addressComponents: google.maps.GeocoderAddressComponent[]
  ) {
    let address: Address = {
      city: '',
      state: '',
      streetAddress: '',
      type: this.inputForm?.controls['type'].value,
      zipCode: '',
    };

    for (const component of addressComponents) {
      const componentType = component.types[0];
      const handler = componentHandlers[componentType];

      if (handler) {
        address = handler(component, address);
      }
    }

    return address;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
