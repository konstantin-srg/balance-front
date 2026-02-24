import { Injectable } from '@angular/core';
import {FormControl, AsyncValidatorFn, ValidatorFn, FormGroup} from '@angular/forms';
import { Subscription, Subject, Observable } from 'rxjs';
/*
export class ExtendedFormControl extends FormGroup {
  statusChanges$: Subscription;
  touchedChanges: Subject<boolean> = new Subject<boolean>();

  constructor(
    formState: Object,
    validator: ValidatorFn | ValidatorFn[] = null,
    asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] = null
  ) {
    super(formState, validator, asyncValidator);

    this.statusChanges$ = Observable.merge(
      this.valueChanges,
      this.touchedChanges.distinctUntilChanged()
    ).subscribe(() => {
      console.log('new value or field was touched');
    });
  }

  markAsTouched({ onlySelf }: { onlySelf?: boolean } = {}): void {
    super.markAsTouched({ onlySelf });

    this.touchedChanges.next(true);
  }
}
*/
