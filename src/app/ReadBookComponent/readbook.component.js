"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var readbook_service_1 = require("../../services/readbook.service");
// import angular2-data-table
// import '../src/components/datatable.scss';
// import '../src/themes/material.scss';
var ReadBookComponent = (function () {
    function ReadBookComponent(readBookService) {
        this.readBookService = readBookService;
        // rows = [];
        this.settings = {
            columns: {
                id: {
                    title: 'ID'
                },
                name: {
                    title: 'Full Name'
                },
                username: {
                    title: 'User Name'
                },
                email: {
                    title: 'Email'
                }
            }
        };
        this.data = [
            {
                id: 1,
                name: "Leanne Graham",
                username: "Bret",
                email: "Sincere@april.biz"
            },
            {
                id: 2,
                name: "Ervin Howell",
                username: "Antonette",
                email: "Shanna@melissa.tv"
            },
            // ... list of items
            {
                id: 11,
                name: "Nicholas DuBuque",
                username: "Nicholas.Stanton",
                email: "Rey.Padberg@rosamond.biz"
            }
        ];
    }
    ReadBookComponent.prototype.ngOnInit = function () {
        // this.getBooks();
        // console.log('getbooks')
    };
    // Get Books
    ReadBookComponent.prototype.getBooks = function () {
        var _this = this;
        // now it's a simple subscription to the observable
        // console.log('getbooks',this.readBookService);
        // debugger
        this.readBookService.getBooksData()
            .subscribe(function (data) {
            // var tempArray =[];
            // tempArray.push(data);
            // this.getBooksList=tempArray;
            // console.log('temparray:',tempArray)
            _this.rows = data;
        }, function (err) { return alert(err); }, function () { });
    };
    return ReadBookComponent;
}());
ReadBookComponent = __decorate([
    core_1.Component({
        providers: [readbook_service_1.ReadBookService],
        moduleId: module.id,
        // templateUrl: 'app/modules/ReadBookComponent/readbook.component.html',
        // styleUrls: ['app/modules/ReadBookComponent/readbook.component.css'],
        templateUrl: './readbook.component.html',
        styleUrls: ['readbook.component.css'],
    }),
    __metadata("design:paramtypes", [readbook_service_1.ReadBookService])
], ReadBookComponent);
exports.ReadBookComponent = ReadBookComponent;
;
//# sourceMappingURL=readbook.component.js.map