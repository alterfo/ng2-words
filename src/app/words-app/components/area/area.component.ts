import {debounceTime} from 'rxjs/operators';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextService} from '../../services/text.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {C} from '../../const';
import {Temporal} from '@js-temporal/polyfill';
import PlainDate = Temporal.PlainDate;
import {CountWordsPipe} from '../../pipes/count-words.pipe';

@Component({
  selector: 'words-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  textForm: FormGroup;
  state = C.STATES.saved;
  @Input() currentDate: PlainDate;
  @Input() past = false;
  savingCycleInterval: any;
  historyRecord = '';
  @Input() text: string = '';
  @Output() updateWordsCount = new EventEmitter()

  constructor(private textService: TextService,
              private _fb: FormBuilder,
              private toastr: ToastrService,
  ) {
    this.textForm = this._fb.group({
      text: this._fb.control('', Validators.required)
    });

    this.textForm.get('text')!.valueChanges.pipe(
      debounceTime(10)
    ).subscribe(() => {
      this.state = C.STATES.notsaved;
    });
  }

  ngOnInit() {
    if (this.past) {
      clearInterval(this.savingCycleInterval);
      this.historyRecord = this.text || 'Здесь ничего нет';
    } else {
      this.textForm.get('text')!.patchValue(this.text, {emitEvent: false});
      this.savingCycleInterval = setInterval(() => {
        this.save();
      }, 10000);
    }
  }

  getText() {
    return this.textForm.get('text')!.value || '';
  }

  async save() {
    if (this.state === C.STATES.notsaved) {
      this.state = C.STATES.saving;
      this.updateWordsCount.emit(new CountWordsPipe().transform(this.getText()))
      await this.textService.saveText(this.getText());
      this.state = C.STATES.saved;
    }
  }

  isSaving() {
    return this.state === C.STATES.saving;
  }

  isSaved() {
    return this.state === C.STATES.saved;
  }

  isNotSaved() {
    return this.state === C.STATES.notsaved;
  }


  async saveByKeys(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.state = C.STATES.saving;
    await this.textService.saveText(this.getText())
    this.state = C.STATES.saved;
    this.toastr.success('Сохранение прошло успешно!', 'Продолжайте!');
  }

  putTab(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    this.textForm.get('text')!.setValue(this.getText().substring(0, start) + '\t' + this.getText().substring(end));
    return target.selectionStart = target.selectionEnd = start + 1;
  }
}
