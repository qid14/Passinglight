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
var router_1 = require("@angular/router");
var readbook_service_1 = require("../../services/readbook.service");
var BookDetailsComponent = (function () {
    function BookDetailsComponent(activatedRoute, readBookService) {
        this.activatedRoute = activatedRoute;
        this.readBookService = readBookService;
    }
    BookDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params
            .map(function (params) { return params['isbn']; })
            .subscribe(function (params) {
            _this.isbn = params;
        });
        // this.bookDetails(this.isbn);
    };
    return BookDetailsComponent;
}());
BookDetailsComponent = __decorate([
    core_1.Component({
        providers: [readbook_service_1.ReadBookService],
        templateUrl: 'app/modules/BookDetailsComponent/bookdetails.component.html',
        styleUrls: ['app/modules/BookDetailsComponent/bookdetails.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, readbook_service_1.ReadBookService])
], BookDetailsComponent);
exports.BookDetailsComponent = BookDetailsComponent;
//# sourceMappingURL=bookdetails.component.js.map