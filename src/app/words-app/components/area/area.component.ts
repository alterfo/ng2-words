import {debounceTime} from 'rxjs/operators';
import {Component, Input, OnInit} from '@angular/core';
import {TextService} from '../../services/text.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {C} from '../../const';
import {Temporal} from '@js-temporal/polyfill';
import PlainDate = Temporal.PlainDate;

@Component({
  selector: 'words-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  textForm: FormGroup;
  state = C.STATES.saved;
  @Input() currentDate: PlainDate | undefined;
  @Input() past = false;
  savingCycleInterval: any;
  historyRecord = '';
  wordsCount = 0;

  constructor(private textService: TextService,
              private _fb: FormBuilder,
              private toastr: ToastrService,
  ) {
    this.textForm = this._fb.group({
      text: this._fb.control('', Validators.required)
    });

    this.textForm.get('text')!.valueChanges.pipe(debounceTime(10)).subscribe(() => {
      this.state = C.STATES.notsaved;
      this.wordsCount = this.getWordsCount();
    });
  }

  ngOnInit() {
    if (this.currentDate) {
      this.textService.getTextByDate(this.currentDate.toString())
        .subscribe((text) => {
          if (this.past) {
            clearInterval(this.savingCycleInterval);
            this.historyRecord = text?.text || 'Здесь ничего нет';
          } else {
            this.textForm.get('text')!.patchValue(text?.text, {emitEvent: false});
            this.wordsCount = this.getWordsCount();
            this.savingCycleInterval = setInterval(() => {
              this.save();
            }, 10000);
          }
        });
    }
  }

  isToday() {
    return !this.past;
  }

  getWordsCount() {
    const wordsArr = this.getText().trim().split(/[\s,.;]+/);
    for (let i = 0; i < wordsArr.length; i++) {
      if (wordsArr[i] === '') {
        wordsArr.splice(i, 1) && i--;
      }
    }
    return wordsArr.length;
  }

  getText() {
    return this.textForm.get('text')!.value || '';
  }

  save() {
    if (this.state === C.STATES.notsaved) {
      this.state = C.STATES.saving;
      this.textService.saveText(this.getText()).subscribe((res: any) => {
        if (res.ok === 1) {
          this.state = C.STATES.saved;
        }
      }, (err) => {
        this.state = C.STATES.notsaved;
        this.toastr.success('Попробуйте сохранить чуть позже!\n' + err, 'Что-то пошло не так!');
      });
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


  saveByKeys(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.state = C.STATES.saving;
    this.textService.saveText(this.getText()).subscribe((res: any) => {
      this.state = C.STATES.saved;
      this.toastr.success('Сохранение прошло успешно!', 'Продолжайте!');
    });
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
