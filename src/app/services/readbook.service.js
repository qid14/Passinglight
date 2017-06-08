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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ReadBookService = (function () {
    function ReadBookService(http) {
        this.http = http;
    }
    // ReadBookService getBooksData function
    ReadBookService.prototype.getBooksData = function () {
        // debugger;
        // return an observable
        // console.log('get book data service!');
        return this.http.get('http://localhost:3002/books')
            .map(function (responseData) { return responseData.json(); });
    };
    return ReadBookService;
}()); // end ReadBookService class
ReadBookService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ReadBookService);
exports.ReadBookService = ReadBookService;
//# sourceMappingURL=readbook.service.js.map